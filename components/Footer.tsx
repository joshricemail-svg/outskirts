import { site } from '@/config/site';

export function Footer() {
  const year = 2026; // Static export: baked at build. Bump on rebuild.
  return (
    <footer className="site-footer">
      <div className="wrap foot-inner">
        <div>
          <div className="foot-brand">
            OUTSKIRTS <span className="foot-brand-sub">SALOON</span>
          </div>
          <div className="foot-tag">{site.tagline}</div>
          <div className="foot-meta" style={{ marginTop: 8 }}>
            {site.address.street} · {site.address.line2}
            <br />
            <a href={site.phone.href}>{site.phone.display}</a>
          </div>
        </div>
        <div className="foot-meta" style={{ textAlign: 'right' }}>
          <div className="powered">
            Events powered by <b>{site.events.provider}</b>
          </div>
          <div style={{ marginTop: 8 }}>© {year} Outskirts Saloon</div>
        </div>
      </div>
    </footer>
  );
}
