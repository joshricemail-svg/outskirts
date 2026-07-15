/**
 * Badge — circular seal version of the mark: "EVERYBODY'S HOMETOWN BAR" arced
 * across the top, "PRESCOTT · ARIZONA" across the bottom, the OUTSKIRTS wordmark
 * across the center, framed by a double cream ring on navy.
 *
 * Not used anywhere on the site yet — included for coasters, stickers, and
 * social avatars. Colors are explicit (fixed navy/cream/brass mark).
 */

interface BadgeProps {
  size?: number;
  title?: string;
  decorative?: boolean;
  className?: string;
}

export function Badge({ size = 200, title = 'Outskirts Saloon — Prescott, Arizona', decorative = false, className }: BadgeProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': title };

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} {...a11y}>
      {!decorative && <title>{title}</title>}
      <defs>
        {/* Top arc: left→right over the top, upright text. */}
        <path id="badge-arc-top" d="M 32 100 A 68 68 0 0 1 168 100" fill="none" />
        {/* Bottom arc: left→right along the bottom, upright text. */}
        <path id="badge-arc-bottom" d="M 34 100 A 66 66 0 0 0 166 100" fill="none" />
      </defs>

      {/* Field + double ring */}
      <circle cx="100" cy="100" r="98" fill="#1a2c50" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="#f4f1e8" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#f4f1e8" strokeWidth="1" opacity="0.5" />

      {/* Arced legends */}
      <text
        fill="#f4f1e8"
        fontFamily="'Libre Franklin', system-ui, sans-serif"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="2.4"
      >
        <textPath href="#badge-arc-top" startOffset="50%" textAnchor="middle">
          EVERYBODY&#39;S HOMETOWN BAR
        </textPath>
      </text>
      <text
        fill="#f4f1e8"
        fontFamily="'Libre Franklin', system-ui, sans-serif"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="3"
      >
        <textPath href="#badge-arc-bottom" startOffset="50%" textAnchor="middle">
          PRESCOTT · ARIZONA
        </textPath>
      </text>

      {/* Center wordmark */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill="#f4f1e8"
        fontFamily="'Bodoni Moda', Didot, Georgia, serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="1"
      >
        OUTSKIRTS
      </text>
      {/* Small brass flourishes flanking the wordmark */}
      <line x1="52" y1="118" x2="80" y2="118" stroke="#c9a24a" strokeWidth="1.5" />
      <line x1="120" y1="118" x2="148" y2="118" stroke="#c9a24a" strokeWidth="1.5" />
    </svg>
  );
}
