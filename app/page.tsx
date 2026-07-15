import Link from 'next/link';
import { OpenStatus } from '@/components/OpenStatus';
import { HoursList } from '@/components/HoursList';

export default function HomePage() {
  return (
    <div className="view">
      {/* ---------- the painted sign ---------- */}
      <section className="hero">
        <div className="wrap">
          <h1 className="hero-logo">
            <picture>
              <source
                type="image/webp"
                srcSet="/hero-neon-900.webp 900w, /hero-neon.webp 1600w"
                sizes="(max-width: 640px) 94vw, min(1040px, 92vw)"
              />
              <img
                src="/hero-neon.jpg"
                width={1600}
                height={799}
                alt="Outskirts Saloon — Everybody's Hometown Bar"
                fetchPriority="high"
              />
            </picture>
          </h1>
          <p className="sub">
            Live music, cold drinks, and a stool with your name on it — one block off Whiskey Row in
            downtown Prescott.
          </p>
          <div className="under">
            <Link className="btn btn-primary" href="/events">
              See what&#39;s on
            </Link>
            <Link className="btn btn-ghost" href="/visit">
              Hours &amp; directions
            </Link>
          </div>
          <div className="under" style={{ marginTop: 26 }}>
            <OpenStatus />
          </div>
        </div>
      </section>

      {/* ---------- everybody's welcome ---------- */}
      <section className="block">
        <div className="wrap">
          <div className="strip">
            <div>
              <div className="eyebrow">The place</div>
              <h2>Everybody&#39;s welcome</h2>
              <p className="lede">
                A block south of the Courthouse Plaza, Outskirts is the room where locals, regulars,
                and whoever wandered in off the Row all end up at the same bar. Good music, honest
                pours, no attitude.
              </p>
              <ul className="feature-list">
                <li>
                  <b>Live music</b>
                  <span>Local acts and Whiskey Row regulars — every show on our Events page.</span>
                </li>
                <li>
                  <b>Full bar</b>
                  <span>Whiskey deep, beer cold, cocktails made right.</span>
                </li>
                <li>
                  <b>Open late</b>
                  <span>Till 2 AM Friday &amp; Saturday.</span>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="eyebrow">This week</div>
              <div className="card-title serif">Hours</div>
              <HoursList variant="mini" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- three-fact strip ---------- */}
      <section className="block tight">
        <div className="wrap">
          <div className="facts">
            <div className="fact">
              <div className="k">2 AM</div>
              <div className="l">Fri &amp; Sat close</div>
            </div>
            <div className="fact">
              <div className="k">1 block</div>
              <div className="l">Off Whiskey Row</div>
            </div>
            <div className="fact">
              <div className="k">Live</div>
              <div className="l">Music &amp; events</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
