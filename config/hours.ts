/**
 * Opening hours for Outskirts Saloon.
 *
 * Each day is modelled as minutes-from-midnight. A `close` value **over 1440
 * spills into the next calendar day** — e.g. Friday closes at 2 AM Saturday, so
 * its range is [480, 1560] (1560 = 26:00 = 2 AM the following morning).
 *
 * `day` follows JS `Date.getDay()`: 0 = Sunday … 6 = Saturday.
 * The engine that consumes this lives in `lib/hours.ts`.
 */

export interface DayHours {
  /** JS weekday index, 0 = Sunday … 6 = Saturday. */
  day: number;
  label: string;
  /** Human-readable open time, e.g. "8:00 AM". */
  open: string;
  /** Human-readable close time, e.g. "2:00 AM". */
  close: string;
  /**
   * [openMinutes, closeMinutes] from midnight. closeMinutes may exceed 1440
   * to represent closing after midnight.
   */
  range: [number, number];
}

/** Keyed by weekday index for O(1) lookup by the engine. */
export const HOURS: Record<number, DayHours> = {
  0: { day: 0, label: 'Sunday', open: '11:00 AM', close: '12:00 AM', range: [660, 1440] },
  1: { day: 1, label: 'Monday', open: '11:00 AM', close: '11:00 PM', range: [660, 1380] },
  2: { day: 2, label: 'Tuesday', open: '11:00 AM', close: '11:00 PM', range: [660, 1380] },
  3: { day: 3, label: 'Wednesday', open: '8:00 AM', close: '11:00 PM', range: [480, 1380] },
  4: { day: 4, label: 'Thursday', open: '8:00 AM', close: '11:00 PM', range: [480, 1380] },
  5: { day: 5, label: 'Friday', open: '8:00 AM', close: '2:00 AM', range: [480, 1560] },
  6: { day: 6, label: 'Saturday', open: '11:00 AM', close: '2:00 AM', range: [660, 1560] },
};

/** Display order — the week starts on Tuesday for this venue. */
export const DISPLAY_ORDER: number[] = [2, 3, 4, 5, 6, 0, 1];

/** IANA timezone the bar physically lives in. Arizona does not observe DST. */
export const VENUE_TIMEZONE = 'America/Phoenix';
