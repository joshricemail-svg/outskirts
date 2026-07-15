import { OTile } from '@/components/logo/OTile';
import { site } from '@/config/site';

export function Footer() {
  const year = 2026; // Static export: baked at build. Bump on rebuild.
  return (
    <footer className="site-footer">
      <div className="wrap foot-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <OTile size={76} decorative />
          <div>
            <div className="foot-brand">OUTSKIRTS</div>
            <div className="foot-tag">{site.tagline}</div>
            <div className="foot-meta" style={{ marginTop: 8 }}>
              {site.address.street} · {site.address.line2}
              <br />
              <a href={site.phone.href}>{site.phone.display}</a>
            </div>
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
