# RUNBOOK — how to run this website

For current and future webmasters. No installs needed for most tasks — the GitHub web editor
covers the everyday ones.

## Change text on a page (no installs, ~2 minutes)

1. Go to the repo on github.com → `src/pages/` → the page (e.g. `about.astro`)
2. Click the ✏️ pencil (top right of the file view)
3. Edit the text between the HTML tags — don't touch lines that start with `import` or sit between the `---` fences unless you know why
4. Click **Commit changes** → "Commit directly to `main`"
5. Done. The site rebuilds and publishes itself in ~1 minute (Actions tab shows progress)

## Add / edit a volunteer signup

Edit the `signups` list near the top of `src/pages/volunteer.astro` — copy an existing entry.
Signups disappear automatically after their `until` date.

## Update events

Events come from the PTSA calendar — **edit the calendar, not the website.** The site rebuilds
from the calendar's ICS feed four times a day (feed URL lives in `src/lib/events.ts`; today it's
the OurSchoolPages calendar, at cutover it becomes the Google Calendar). Need a change visible
*now*? Actions tab → "Deploy to GitHub Pages" → "Run workflow".

## Something broke

- **Site won't build:** Actions tab → click the red ✗ → read the error. Usually a typo in a
  recently edited file; GitHub's "Revert" button on the bad commit fixes it instantly.
- **Site is fine but stale:** Actions tab → "Deploy to GitHub Pages" → "Run workflow".
- **Deploy failed with "deployment_queued... Timeout":** GitHub Pages had a backend hiccup —
  open the failed run and click "Re-run failed jobs". No code change needed.
- **Design questions:** every approved component is at `/design/system` on the live site.
  If a new page needs something that isn't there, add it to the system page first.

## Rules that keep us out of trouble

1. **This repo is public. Never commit names/emails/phones of families, member lists, or
   anything from the directory — git history is forever.**
2. Meeting minutes get redacted (no family names beyond board roles) before publishing.
3. One sticker cluster per site, one tape accent per view, one red band per page — the design
   stays special by staying scarce (see `/design/system`).

## Accounts & handoff

Credential inventory, owners, and the officer-transition checklist live in the PTSA password
vault — see PLAN.md §8. Minimum two owners per account, always role emails, never personal.

## Local development (optional, for bigger changes)

```bash
nvm use          # or: install Node 22
npm ci
npm run dev      # local preview at localhost:4321
npm run build    # must pass before merging
```
