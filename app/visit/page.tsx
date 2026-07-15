import type { Metadata } from 'next';
import { OpenStatus } from '@/components/OpenStatus';
import { HoursList } from '@/components/HoursList';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Visit — Hours, Address & Directions',
  description:
    'Outskirts Saloon is at 444 W Goodwin St, one block south of the Courthouse Plaza in downtown Prescott, AZ. Hours, phone, and map.',
  alternates: { canonical: '/visit' },
};

export default function VisitPage() {
  return (
    <div className="view">
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Find us</div>
            <h1>Visit</h1>
            <p>One block south of the Courthouse Plaza in downtown Prescott. Pull up, come in.</p>
          </div>

          <div className="visit-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Hours
              </div>
              <HoursList variant="full" />
              <div style={{ marginTop: 18 }}>
                <OpenStatus />
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Details
              </div>

              <div className="info-line">
                <div className="ico" aria-hidden="true">
                  ◆
                </div>
                <div>
                  <div>{site.address.street}</div>
                  <div className="sub">{site.address.line2}</div>
                  <a
                    className="btn btn-ghost"
                    style={{ marginTop: 16 }}
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>

              <div className="info-line">
                <div className="ico" aria-hidden="true">
                  ◆
                </div>
                <div>
                  <a className="link" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                  <div className="sub">Call the bar</div>
                </div>
              </div>

              <div className="info-line">
                <div className="ico" aria-hidden="true">
                  ◆
                </div>
                <div>
                  <div>Follow along</div>
                  {/* PLACEHOLDER: real social links unknown — see config/site.ts */}
                  <div className="sub">Add Outskirts&#39; social links</div>
                  <div className="socials">
                    {site.socials.map((s) => (
                      <a key={s.label} href={s.href} aria-label={s.label}>
                        {s.short}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
