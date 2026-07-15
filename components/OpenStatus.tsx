'use client';

import { useEffect, useState } from 'react';
import { getStatus, type OpenStatus as Status } from '@/lib/hours';

/**
 * Live open/closed indicator.
 *
 * Renders a neutral placeholder on the server (and on the first client paint) so
 * server and client markup match — no hydration error. The real, Phoenix-pinned
 * status is computed in an effect after mount and re-evaluated every 60s. The
 * pulsing dot is killed by the prefers-reduced-motion rule in globals.css.
 */
export function OpenStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const className = status ? `status ${status.open ? 'open' : 'closed'}` : 'status';
  const label = status ? status.text : 'Checking hours…';

  return (
    <span className={className} role="status" aria-live="polite">
      <span className="dot" />
      <span className="txt">{label}</span>
    </span>
  );
}
