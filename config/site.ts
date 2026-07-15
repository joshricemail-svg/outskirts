/**
 * Venue-specific facts for Outskirts Saloon.
 * Single source of truth for everything that isn't hours or menu.
 * Edit here — never hardcode these in components.
 */

export const site = {
  name: 'Outskirts Saloon',
  tagline: "Everybody's Hometown Bar",
  positioning: 'Prescott, Arizona',

  url: 'https://outskirtssaloon.com',

  address: {
    street: '444 W Goodwin St',
    city: 'Prescott',
    state: 'AZ',
    zip: '86303',
    /** One-line, human-readable. */
    line2: 'Prescott, AZ 86303',
  },

  /** Where we sit relative to downtown landmarks. Drives location copy. */
  geography: 'One block south of the Courthouse Plaza, one block off Whiskey Row.',

  phone: {
    /** As shown to humans. */
    display: '(928) 450-9877',
    /** Always this exact tel: value. */
    href: 'tel:+19284509877',
  },

  /** Prefilled Google Maps search for the venue. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Outskirts+Saloon+444+W+Goodwin+St+Prescott+AZ',

  /**
   * PLACEHOLDER: real social handles unknown. Icons render but point at '#'.
   * Swap `href` to the real profile URLs when known; leave `href: '#'` to keep
   * the "add links" note visible.
   */
  socials: [
    { label: 'Facebook', short: 'f', href: '#' },
    { label: 'Instagram', short: 'ig', href: '#' },
  ],

  /** Third-party events provider, credited in the footer on every page. */
  events: {
    provider: 'SkpR',
    embedSrc: 'https://skprapp.com/embed/venue/outskirts-saloon',
    embedScript: 'https://skprapp.com/embed.js',
  },
} as const;

export type Site = typeof site;
