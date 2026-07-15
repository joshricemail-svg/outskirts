/**
 * SignboardLogo — the signature element. Recreates the bar's physical
 * hand-painted sign: a navy panel with a 2px cream border and an inset 1px
 * cream rule (the double-rule is on the real sign and is essential), a lit
 * radial highlight above and a deep shadow below so it reads as a lit board.
 *
 * Rendered as semantic HTML (not SVG) because the wordmark must be real,
 * selectable, fluid-scaling text — the hero passes `titleAs="h1"` so the page
 * gets its single, real <h1>. The board chrome and glow live in the `.signboard`
 * CSS in app/globals.css.
 */

interface SignboardLogoProps {
  /** Element for the wordmark. Use 'h1' for the page's primary heading. */
  titleAs?: 'h1' | 'div';
  wordmark?: string;
  /** Second line of the name, e.g. "SALOON". */
  subword?: string;
  tagline?: string;
}

export function SignboardLogo({
  titleAs = 'div',
  wordmark = 'OUTSKIRTS',
  subword = 'SALOON',
  tagline = "Everybody's Hometown Bar",
}: SignboardLogoProps) {
  const Heading = titleAs;
  const accessibleName = subword ? `${wordmark} ${subword}` : wordmark;
  return (
    <div className="signboard">
      <Heading className="name" aria-label={accessibleName}>
        <span className="wordmark">{wordmark}</span>
        {subword && <span className="saloon">{subword}</span>}
      </Heading>
      <div className="rule" aria-hidden="true" />
      <div className="tagline">{tagline}</div>
    </div>
  );
}
