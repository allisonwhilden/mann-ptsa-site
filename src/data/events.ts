/**
 * PLACEHOLDER events — replaced by the build-time Google Calendar ICS fetch
 * once the PTSA's calendar URL is wired in (see PLAN.md §2 Calendar).
 * Dates below are representative samples from the 2025–26 pattern. [VERIFY]
 */
export interface PtsaEvent {
  date: string; // display form, e.g. "TUE · SEP 15"
  title: string;
  description: string;
  href?: string;
}

export const upcomingEvents: PtsaEvent[] = [
  {
    date: 'TUE · SEP 15',
    title: 'Back-to-School Night',
    description: 'Meet your teachers, find your people. PTSA table by the gym doors. [VERIFY date]',
  },
  {
    date: 'FRI · SEP 25',
    title: 'Movie Night on the Field',
    description: 'Blankets, popcorn, and a family favorite under the stars. [VERIFY date]',
  },
  {
    date: 'THU · OCT 22',
    title: 'General Membership Meeting',
    description: 'Library + Zoom, 6:00 pm. Childcare provided. Kids welcome. [VERIFY date]',
  },
];
