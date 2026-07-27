/**
 * Site-wide data — ONE source of truth.
 *
 * The previous build hardcoded the phone number, email, address, tagline and
 * copyright year into all 13 pages. Changing the phone number meant 13 edits,
 * and the pages had already drifted apart. Everything global lives here now.
 *
 * Every value marked PLACEHOLDER comes from INTAKE.md once you supply it.
 */

export const site = {
  /** PLACEHOLDER — working name until the real school name is supplied. */
  name: 'Northgate Academy',
  shortName: 'Northgate',
  /** PLACEHOLDER */
  tagline: 'Learning for life',
  /** PLACEHOLDER — used as the default meta description. */
  description:
    'An independent day school in Lagos offering Primary and Secondary education, ' +
    'combining academic rigour with genuine pastoral care.',
  /** PLACEHOLDER */
  founded: 1998,
  locale: 'en-NG',

  contact: {
    /** PLACEHOLDER */
    addressLines: ['1 Northgate Way', 'Ikeja', 'Lagos', 'Nigeria'],
    /** PLACEHOLDER — E.164 for tel: links, display form for humans. */
    phone: { display: '+234 800 000 0000', href: '+2348000000000' },
    phoneAlt: { display: '+234 800 000 0001', href: '+2348000000001' },
    /** PLACEHOLDER */
    whatsapp: { display: '+234 800 000 0000', href: '2348000000000' },
    email: 'hello@northgate-academy.ng',
    admissionsEmail: 'admissions@northgate-academy.ng',
    officeHours: 'Monday – Friday, 7:30am – 4:00pm',
    /** PLACEHOLDER — replace with the real Google Maps place link. */
    mapsUrl: 'https://www.google.com/maps',
  },

  /**
   * Social links. Anything left null is omitted from the footer entirely —
   * the previous build shipped 52 dead `href="#"` social links.
   */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    x: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },

  /**
   * Homepage stats. Set `enabled: false` (or empty the list) and the band is
   * not rendered — better than inventing numbers a school would be held to.
   */
  stats: {
    enabled: true,
    /** PLACEHOLDER FIGURES — every one of these must be verified before launch. */
    items: [
      { value: '25+', label: 'Years of teaching' },
      { value: '900', label: 'Students enrolled' },
      { value: '80+', label: 'Teaching staff' },
      { value: '1:12', label: 'Teacher to student ratio' },
    ],
  },

  /** Set to true during review to outline every placeholder on the page. */
  showPlaceholderOutlines: false,
} as const;

/** Copyright year is computed, never hardcoded — the old build shipped "© 2026". */
export const currentYear = new Date().getFullYear();

/** Address as a single line, for meta tags and JSON-LD. */
export const addressOneLine = site.contact.addressLines.join(', ');

/** Social entries that actually have a URL, ready to render. */
export const activeSocial = Object.entries(site.social)
  .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  .map(([network, url]) => ({ network, url }));
