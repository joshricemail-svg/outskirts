import type { Metadata } from 'next';
import { menu, isSample, sampleNotice } from '@/config/menu';

export const metadata: Metadata = {
  title: 'Menu — Drinks & Bites',
  description:
    'Whiskey-forward, honest pours, and something to soak it up. Drinks and bar bites at Outskirts Saloon, Prescott AZ.',
  alternates: { canonical: '/menu' },
};

export default function MenuPage() {
  return (
    <div className="view">
      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">The bar</div>
            <h1>Drinks &amp; bites</h1>
            <p>Whiskey-forward, honest pours, and something to soak it up.</p>
          </div>

          {isSample && <div className="placeholder-note">⚑ {sampleNotice}</div>}

          <div className="menu-grid">
            {menu.map((cat) => (
              <div className="menu-cat" key={cat.title}>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item.name}>
                      <div className="item">
                        <b>{item.name}</b>
                        {item.note && <span>{item.note}</span>}
                      </div>
                      <span className="price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
