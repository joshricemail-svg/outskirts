'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/config/site';

const LINKS = [
  { href: '/', label: 'Home' },
  // URL stays /events; label includes specials since they show on the calendar too.
  { href: '/events', label: 'Events / Specials' },
  // Menu is hidden for now — not ready. Re-add when the real menu lands.
  { href: '/visit', label: 'Visit' },
];

/** Normalize `/menu/` → `/menu` so trailingSlash routes still match. */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

export function Nav() {
  const pathname = normalize(usePathname() || '/');
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Outskirts Saloon — home">
          <span className="btype">
            Outskirts <span className="btype-sub">Saloon</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          MENU
        </button>

        <nav
          id="primary-nav"
          className={`links${open ? ' show' : ''}`}
          aria-label="Primary"
        >
          {LINKS.map((l) => {
            const active = normalize(l.href) === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? 'active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <a className="call-pill" href={site.phone.href}>
          {site.phone.display}
        </a>
      </div>
    </header>
  );
}
