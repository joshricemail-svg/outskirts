'use client';

import { useEffect, useState } from 'react';
import { HOURS, DISPLAY_ORDER } from '@/config/hours';
import { toVenueTime } from '@/lib/hours';

/**
 * The week's hours, in venue display order (starting Tuesday). The list content
 * is static, but "today" depends on the Phoenix wall-clock day — so it is
 * applied after mount to avoid a hydration mismatch. Server renders no
 * highlight; the client fills it in.
 */
export function HoursList({ variant = 'full' }: { variant?: 'full' | 'mini' }) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(toVenueTime(new Date()).day);
  }, []);

  const listClass = variant === 'mini' ? 'mini-hours' : 'full-hours';

  return (
    <ul className={listClass}>
      {DISPLAY_ORDER.map((d) => {
        const h = HOURS[d];
        return (
          <li key={d} className={d === today ? 'today' : undefined}>
            <span>{h.label}</span>
            <span>
              {h.open} – {h.close}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
