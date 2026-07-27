/**
 * Microsite configuration.
 *
 * Primary and Secondary are microsites: they share the brand, header and
 * footer, but each has its own sub-navigation, accent colour and voice.
 * Both are driven entirely by this object, so adding a Sixth Form microsite
 * later is a data edit plus a folder of pages — not a new layout.
 *
 * The accent colours themselves live in src/styles/theme/_tokens.scss under
 * [data-section="…"]; SectionLayout sets that attribute.
 */

import type { NavItem } from './nav';

export type SectionKey = 'primary' | 'secondary';

export type SectionConfig = {
  key: SectionKey;
  /** Full name, e.g. for page titles. */
  label: string;
  /** Short name for breadcrumbs and the sub-nav brand. */
  shortLabel: string;
  base: string;
  /** PLACEHOLDER copy — one line, shown in the sub-nav and section hero. */
  tagline: string;
  /** PLACEHOLDER — age/year range served. */
  ages: string;
  nav: NavItem[];
};

export const sections: Record<SectionKey, SectionConfig> = {
  primary: {
    key: 'primary',
    label: 'Primary School',
    shortLabel: 'Primary',
    base: '/primary',
    tagline: 'Curiosity, confidence and care.',
    ages: 'Ages 5–11 · Primary 1 to Primary 6',
    nav: [
      { label: 'Overview', href: '/primary' },
      { label: 'Early Years', href: '/primary/early-years' },
      { label: 'Curriculum', href: '/primary/curriculum' },
      { label: 'The School Day', href: '/primary/school-day' },
      { label: 'Beyond the Classroom', href: '/primary/co-curricular' },
      { label: 'Our Team', href: '/primary/team' },
      { label: 'Admissions', href: '/primary/admissions' },
    ],
  },
  secondary: {
    key: 'secondary',
    label: 'Secondary School',
    shortLabel: 'Secondary',
    base: '/secondary',
    tagline: 'Scholarship, character and ambition.',
    ages: 'Ages 11–18 · JSS 1 to SSS 3',
    nav: [
      { label: 'Overview', href: '/secondary' },
      { label: 'Curriculum', href: '/secondary/curriculum' },
      { label: 'Subjects', href: '/secondary/subjects' },
      { label: 'Results', href: '/secondary/results' },
      { label: 'Pastoral Care', href: '/secondary/pastoral' },
      { label: 'Co-curricular', href: '/secondary/co-curricular' },
      { label: 'University & Careers', href: '/secondary/university-careers' },
      { label: 'Our Team', href: '/secondary/team' },
      { label: 'Admissions', href: '/secondary/admissions' },
    ],
  },
};

export const sectionList = Object.values(sections);
