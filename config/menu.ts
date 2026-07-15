/**
 * ⚑ PLACEHOLDER MENU — sample structure only.
 *
 * Every price is intentionally `$—`. Do not invent prices. Swap the items and
 * prices below for Outskirts' real menu; the rust-colored note on /menu stays
 * visible until `isSample` is set to false.
 *
 * This is a one-file swap: nothing about the menu is hardcoded in components.
 */

export interface MenuItem {
  name: string;
  /** Short descriptor shown under the item. */
  note?: string;
  /** Keep as `$—` until real prices are provided. */
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

/** When true, the visible "sample menu" warning renders on /menu. */
export const isSample = true;

export const sampleNotice = "Sample menu — swap for Outskirts' real items & prices";

export const menu: MenuCategory[] = [
  {
    title: 'Whiskey',
    items: [
      { name: 'House pour', note: 'Well whiskey, neat or rocks', price: '$—' },
      { name: 'Bourbon flight', note: 'Three one-ounce pours', price: '$—' },
      { name: 'Top shelf', note: 'Ask the bar', price: '$—' },
    ],
  },
  {
    title: 'Beer',
    items: [
      { name: 'Draft', note: 'Rotating local & domestic taps', price: '$—' },
      { name: 'Bottles & cans', note: "Ask what's cold", price: '$—' },
      { name: 'Bucket of five', note: 'Domestics', price: '$—' },
    ],
  },
  {
    title: 'Cocktails',
    items: [
      { name: 'Old Fashioned', note: 'The way it should be', price: '$—' },
      { name: 'Ranch water', note: 'Tequila, lime, soda', price: '$—' },
      { name: 'Margarita', note: 'House or top-shelf', price: '$—' },
    ],
  },
  {
    title: 'Bar bites',
    items: [
      { name: 'Loaded nachos', note: 'Enough to share', price: '$—' },
      { name: 'Wings', note: 'Choice of sauce', price: '$—' },
      { name: 'Pretzel & beer cheese', note: 'Warm', price: '$—' },
    ],
  },
];
