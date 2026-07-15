import type { Metadata } from 'next';
import Script from 'next/script';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: "What's On — Live Music & Events",
  description:
    "Live music and events at Outskirts Saloon in Prescott, AZ. Every show, straight from our calendar.",
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
  return (
    <div className="view">
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Live music &amp; events</div>
            <h1>What&#39;s on</h1>
            <p>Every show, straight from our calendar. Check back often — the lineup moves fast.</p>
          </div>

          {/*
            SkpR owns event SEO by design — no JSON-LD, no server-rendered event
            copy here. The embed renders on white; it stays a distinct panel
            rather than blending into the navy page. min-height (not a fixed
            height) lets embed.js post the real height and resize the frame.
          */}
          <div className="embed-frame">
            <iframe
              src={site.events.embedSrc}
              style={{ width: '100%', border: 0, minHeight: 760 }}
              loading="lazy"
              title="SkpR events calendar"
            />
          </div>
          <Script src={site.events.embedScript} strategy="lazyOnload" />
        </div>
      </section>
    </div>
  );
}
