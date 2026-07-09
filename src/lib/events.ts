/**
 * Build-time events from the PTSA calendar's public ICS feed.
 *
 * Source of truth today: the OurSchoolPages calendar feed. At cutover this
 * URL changes to the PTSA's Google Calendar ICS — nothing else changes.
 *
 * Fail-soft by design (PLAN §2): if the feed is unreachable or empty, the
 * site builds fine and event sections render their designed empty state.
 */
import ical from 'node-ical';

const FEED_URL = 'https://horacemannptsa.ourschoolpages.com/event/ical/all.ics';

export interface PtsaEvent {
  date: string; // display form, e.g. "TUE · SEP 15"
  isoDate: string;
  title: string;
  description: string;
}

const fmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'America/Los_Angeles',
});

function displayDate(d: Date): string {
  const parts = fmt.formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('weekday').toUpperCase()} · ${get('month').toUpperCase()} ${get('day')}`;
}

export async function getUpcomingEvents(limit = 12): Promise<PtsaEvent[]> {
  try {
    const data = await ical.async.fromURL(FEED_URL);
    const now = Date.now();
    const events = Object.values(data)
      .filter((e): e is ical.VEvent => e.type === 'VEVENT')
      .filter((e) => e.start && e.start.getTime() >= now - 24 * 3600 * 1000)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, limit)
      .map((e) => ({
        date: displayDate(e.start),
        isoDate: e.start.toISOString(),
        title: e.summary ?? 'PTSA event',
        description: (e.description ?? '').replace(/\\n/g, ' ').slice(0, 160),
      }));
    return events;
  } catch (err) {
    console.warn('[events] ICS fetch failed — building with empty events:', err);
    return [];
  }
}
