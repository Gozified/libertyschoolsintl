/**
 * Navigation as data.
 *
 * The previous build copy-pasted the nav into 13 files and it had already
 * drifted: index.html grew two extra dropdown items pointing at content that
 * didn't exist. Defining it once means that cannot happen — and every href
 * below corresponds to a real route in src/pages.
 */

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Welcome', href: '/about' },
      { label: 'Our History', href: '/about/history' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Governance', href: '/about/governance' },
      { label: 'Policies', href: '/about/policies' },
      { label: 'Publications', href: '/about/publications' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'Overview', href: '/admissions' },
      { label: 'Why Northgate', href: '/admissions/why-northgate' },
      { label: 'How to Apply', href: '/admissions/process' },
      { label: 'Fees', href: '/admissions/fees' },
      { label: 'Questions Parents Ask', href: '/admissions/faqs' },
      { label: 'Make an Enquiry', href: '/admissions/enquire' },
    ],
  },
  {
    label: 'Primary',
    href: '/primary',
    children: [
      { label: 'Overview', href: '/primary' },
      { label: 'Early Years', href: '/primary/early-years' },
      { label: 'Curriculum', href: '/primary/curriculum' },
      { label: 'The School Day', href: '/primary/school-day' },
      { label: 'Beyond the Classroom', href: '/primary/co-curricular' },
      { label: 'Our Team', href: '/primary/team' },
      { label: 'Admissions', href: '/primary/admissions' },
    ],
  },
  {
    label: 'Secondary',
    href: '/secondary',
    children: [
      { label: 'Overview', href: '/secondary' },
      { label: 'Curriculum', href: '/secondary/curriculum' },
      { label: 'Subjects', href: '/secondary/subjects' },
      { label: 'Examination Results', href: '/secondary/results' },
      { label: 'Pastoral Care', href: '/secondary/pastoral' },
      { label: 'Co-curricular', href: '/secondary/co-curricular' },
      { label: 'University & Careers', href: '/secondary/university-careers' },
      { label: 'Our Team', href: '/secondary/team' },
      { label: 'Admissions', href: '/secondary/admissions' },
    ],
  },
  {
    label: 'School Life',
    href: '/news',
    children: [
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Term Dates', href: '/events/term-dates' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Parents’ Association', href: '/pta' },
      { label: 'Alumni', href: '/alumni' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

/** Primary call to action, pinned in the header. */
export const headerCta = {
  label: 'Make an Enquiry',
  href: '/admissions/enquire',
};

/**
 * Portal links. These currently resolve to informational pages, not logins —
 * see the note in src/pages/portals. Replace `href` with the real provider URL
 * (and set `external: true`) once the school's systems are known.
 */
export const portals: Array<{
  label: string;
  hint: string;
  href: string;
  icon: string;
  external?: boolean;
}> = [
  {
    label: 'Student Portal',
    hint: 'Timetables & resources',
    href: '/portals/student',
    icon: 'lucide:graduation-cap',
  },
  {
    label: 'Parent Portal',
    hint: 'Reports & payments',
    href: '/portals/parent',
    icon: 'lucide:users',
  },
  {
    label: 'Staff Portal',
    hint: 'Registers & planning',
    href: '/portals/staff',
    icon: 'lucide:briefcase',
  },
  {
    label: 'Admissions',
    hint: 'Enquire or apply',
    href: '/admissions/enquire',
    icon: 'lucide:file-pen-line',
  },
];

/** Footer link columns. Every href is a real route. */
export const footerNav: Array<{ heading: string; links: NavItem[] }> = [
  {
    heading: 'The School',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Primary School', href: '/primary' },
      { label: 'Secondary School', href: '/secondary' },
      { label: 'Work With Us', href: '/careers' },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'How to Apply', href: '/admissions/process' },
      { label: 'Fees', href: '/admissions/fees' },
      { label: 'Questions Parents Ask', href: '/admissions/faqs' },
      { label: 'Make an Enquiry', href: '/admissions/enquire' },
    ],
  },
  {
    heading: 'School Life',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Term Dates', href: '/events/term-dates' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Parents’ Association', href: '/pta' },
      { label: 'Alumni', href: '/alumni' },
    ],
  },
];

/** Small print, kept out of the main columns. */
export const legalNav: NavItem[] = [
  { label: 'Privacy Notice', href: '/privacy' },
  { label: 'Safeguarding', href: '/safeguarding' },
  { label: 'Policies', href: '/about/policies' },
];

/**
 * True when `href` is the current page, or an ancestor of it — used to mark
 * both aria-current="page" and the parent dropdown's active state.
 */
export function isActive(href: string, pathname: string): boolean {
  const clean = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);
  const target = clean(href);
  const current = clean(pathname);
  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}
