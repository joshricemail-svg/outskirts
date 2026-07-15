import { describe, it, expect } from 'vitest';
import { getStatus, formatMinutes, toVenueTime } from './hours';

/**
 * Test instants are written with an explicit `-07:00` offset, which is exactly
 * Phoenix wall-clock time (Arizona = UTC-7 year round, no DST). So the local
 * time in the literal IS the venue time the engine should see.
 *
 * Weekday reference (2026): Jul 13 Mon, 14 Tue, 15 Wed, 16 Thu, 17 Fri,
 * 18 Sat, 19 Sun.
 */

describe('getStatus — the four branches', () => {
  it('1. within today’s window → open until close', () => {
    // Friday 8:00 PM Phoenix, closes 2 AM.
    const s = getStatus(new Date('2026-07-17T20:00:00-07:00'));
    expect(s.open).toBe(true);
    expect(s.text).toBe('Open now · until 2 AM');
  });

  it('2. after midnight, inside yesterday’s spillover → still open (the tricky case)', () => {
    // Saturday 12:30 AM Phoenix is still Friday night (Friday closes 2 AM).
    const s = getStatus(new Date('2026-07-18T00:30:00-07:00'));
    expect(s.open).toBe(true);
    expect(s.text).toBe('Open now · until 2 AM');
  });

  it('2b. spillover ends exactly at 2 AM → closed, opens today', () => {
    // Saturday 2:00 AM: Friday's window has closed, Saturday opens 11 AM.
    const s = getStatus(new Date('2026-07-18T02:00:00-07:00'));
    expect(s.open).toBe(false);
    expect(s.text).toBe('Closed · opens 11:00 AM');
  });

  it('3. before today’s open → closed, opens today', () => {
    // Wednesday 6:00 AM Phoenix, opens 8 AM.
    const s = getStatus(new Date('2026-07-15T06:00:00-07:00'));
    expect(s.open).toBe(false);
    expect(s.text).toBe('Closed · opens 8:00 AM');
  });

  it('4. after today’s close → closed, opens next day', () => {
    // Monday 11:30 PM Phoenix (closes 11 PM); next open is Tuesday 11 AM.
    const s = getStatus(new Date('2026-07-13T23:30:00-07:00'));
    expect(s.open).toBe(false);
    expect(s.text).toBe('Closed · opens Tuesday at 11:00 AM');
  });
});

describe('getStatus — boundaries', () => {
  it('opens exactly at the opening minute', () => {
    // Wednesday 8:00 AM Phoenix.
    expect(getStatus(new Date('2026-07-15T08:00:00-07:00')).open).toBe(true);
  });

  it('closed one minute before opening', () => {
    // Wednesday 7:59 AM Phoenix.
    expect(getStatus(new Date('2026-07-15T07:59:00-07:00')).open).toBe(false);
  });

  it('open one minute before a same-day close', () => {
    // Monday 10:59 PM Phoenix (closes 11 PM).
    expect(getStatus(new Date('2026-07-13T22:59:00-07:00')).open).toBe(true);
  });

  it('closed exactly at a same-day close', () => {
    // Monday 11:00 PM Phoenix.
    const s = getStatus(new Date('2026-07-13T23:00:00-07:00'));
    expect(s.open).toBe(false);
    expect(s.text).toBe('Closed · opens Tuesday at 11:00 AM');
  });

  it('open one minute before an after-midnight close', () => {
    // Saturday 1:59 AM Phoenix, still inside Friday's 2 AM spillover.
    expect(getStatus(new Date('2026-07-18T01:59:00-07:00')).open).toBe(true);
  });
});

describe('timezone pinning (not the visitor’s clock)', () => {
  it('evaluates in Phoenix regardless of the instant’s offset', () => {
    // 07:30 UTC on Sat 2026-07-18 === 00:30 Phoenix (UTC-7) — Friday spillover.
    // A naive local-clock reader in another zone would get this wrong.
    const s = getStatus(new Date('2026-07-18T07:30:00Z'));
    expect(s.open).toBe(true);
    expect(s.text).toBe('Open now · until 2 AM');
  });

  it('same instant read as a different zone is a different day/time', () => {
    // 07:30 UTC is already 07:30 in London — a London-clock engine would think
    // it is well into Saturday morning and closed. Ours stays pinned to Phoenix.
    const vt = toVenueTime(new Date('2026-07-18T07:30:00Z'), 'America/Phoenix');
    expect(vt.day).toBe(6); // Saturday
    expect(vt.minutes).toBe(30); // 00:30
  });
});

describe('formatMinutes', () => {
  it('formats on-the-hour times without minutes', () => {
    expect(formatMinutes(660)).toBe('11 AM');
    expect(formatMinutes(1380)).toBe('11 PM');
    expect(formatMinutes(1560)).toBe('2 AM'); // after-midnight spill
    expect(formatMinutes(1440)).toBe('12 AM');
    expect(formatMinutes(720)).toBe('12 PM');
  });

  it('formats with minutes when present', () => {
    expect(formatMinutes(485)).toBe('8:05 AM');
  });
});
