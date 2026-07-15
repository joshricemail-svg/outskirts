/**
 * Open/closed engine for Outskirts Saloon.
 *
 * Ported from the design prototype and hardened in two ways the prototype got
 * wrong:
 *   1. Timezone — evaluation is pinned to `America/Phoenix` (Arizona has no
 *      DST) instead of the visitor's local clock, so a visitor in California
 *      still sees the bar's real status.
 *   2. Spillover — a window that closes after midnight (Friday → 2 AM) keeps
 *      the bar "open" during the early hours of the *following* day.
 *
 * The engine is pure: pass in the instant to evaluate. Components pass
 * `new Date()`; tests pass fixed instants.
 */

import { HOURS, VENUE_TIMEZONE, type DayHours } from '@/config/hours';

export interface OpenStatus {
  open: boolean;
  /** e.g. "Open now · until 2 AM" or "Closed · opens 11 AM". */
  text: string;
}

/** The venue's wall-clock day (0–6) and minutes-from-midnight at an instant. */
export interface VenueTime {
  day: number;
  minutes: number;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Convert an absolute instant to the venue's wall-clock weekday and
 * minutes-from-midnight, regardless of the runtime's local timezone.
 */
export function toVenueTime(instant: Date, timeZone: string = VENUE_TIMEZONE): VenueTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);

  let weekday = 'Sun';
  let hour = 0;
  let minute = 0;
  for (const p of parts) {
    if (p.type === 'weekday') weekday = p.value;
    else if (p.type === 'hour') hour = parseInt(p.value, 10);
    else if (p.type === 'minute') minute = parseInt(p.value, 10);
  }
  // hourCycle h23 can emit "24" for midnight in some engines; normalise to 0.
  if (hour === 24) hour = 0;

  return { day: WEEKDAY_INDEX[weekday] ?? 0, minutes: hour * 60 + minute };
}

/** Format minutes-from-midnight as a friendly time, e.g. 1560 → "2 AM". */
export function formatMinutes(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  let hh = h % 12;
  if (hh === 0) hh = 12;
  return `${hh}${min ? ':' + String(min).padStart(2, '0') : ''} ${ap}`;
}

/**
 * Determine open/closed status for the venue at a given instant.
 *
 * Branches:
 *   1. Within today's window            → "Open now · until <close>"
 *   2. Inside yesterday's spillover      → "Open now · until <close>"
 *      (e.g. Sat 12:30 AM is still Friday's night)
 *   3. Before today's open               → "Closed · opens <today open>"
 *   4. After today's close               → "Closed · opens <next day> at <time>"
 */
export function getStatus(instant: Date, timeZone: string = VENUE_TIMEZONE): OpenStatus {
  const { day, minutes } = toVenueTime(instant, timeZone);
  const today: DayHours = HOURS[day];

  // 1. Currently inside today's window (the part that falls before midnight).
  if (minutes >= today.range[0] && minutes < Math.min(today.range[1], 1440)) {
    return { open: true, text: `Open now · until ${formatMinutes(today.range[1])}` };
  }

  // 2. Early morning, still inside yesterday's after-midnight spillover.
  const yesterday: DayHours = HOURS[(day + 6) % 7];
  if (yesterday.range[1] > 1440 && minutes < yesterday.range[1] - 1440) {
    return { open: true, text: `Open now · until ${formatMinutes(yesterday.range[1])}` };
  }

  // 3. Before today's opening time.
  if (minutes < today.range[0]) {
    return { open: false, text: `Closed · opens ${today.open}` };
  }

  // 4. After close — points at the next day's opening.
  const next: DayHours = HOURS[(day + 1) % 7];
  return { open: false, text: `Closed · opens ${next.label} at ${next.open}` };
}
