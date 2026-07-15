/**
 * OTile — the navy rounded square with a cream border and a Bodoni "O".
 * Used in the nav (34px), the footer (76px), and exported as the favicon /
 * apple-touch icon.
 *
 * Below ~40px the inner rule turns to mush, so it is dropped automatically.
 * Colors are explicit here (rather than currentColor) because the tile is a
 * fixed navy/cream mark that should read the same on any background.
 */

interface OTileProps {
  size?: number;
  /** Accessible label; omit and set `decorative` when paired with visible text. */
  title?: string;
  decorative?: boolean;
  className?: string;
}

export function OTile({ size = 34, title = 'Outskirts Saloon', decorative = false, className }: OTileProps) {
  const showInnerRule = size >= 40;
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': title };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ flex: 'none' }}
      {...a11y}
    >
      {!decorative && <title>{title}</title>}
      <rect x="2" y="2" width="96" height="96" rx="8" fill="#1a2c50" stroke="#f4f1e8" strokeWidth="3" />
      {showInnerRule && (
        <rect x="9" y="9" width="82" height="82" rx="4" fill="none" stroke="#f4f1e8" strokeWidth="1" opacity="0.5" />
      )}
      <text
        x="50"
        y="70"
        fontFamily="'Bodoni Moda', Didot, Georgia, serif"
        fontSize="58"
        fontWeight="700"
        textAnchor="middle"
        fill="#f4f1e8"
      >
        O
      </text>
    </svg>
  );
}
