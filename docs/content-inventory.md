# Content inventory — mannptsa.org → new site

Source: structured survey of the live site (July 2026, via search index — direct crawl pending
network access; re-verify this list against the full crawl before cutover).

**Legend:** → *new home* · **CUT** = do not migrate · owner = named person required before the page is built (PLAN §4 rule).

## Launch pages (P2) — content sources

| Current page | Fate |
|---|---|
| /Home | Rewrite → **Home** |
| /Page/Pta/Mission | Rewrite → **About** (mission section) |
| /Page/PTSA/BoardMembers + /Page/Pta/BoardMembers (dupes) | Consolidate → **About** (board) — update to 2026–27 roster |
| /Page/PTSA/BoardChairs | → **About** (committees) + **Volunteer** (role descriptions; VP 15–20 h/mo etc.) |
| /Page/Pta/Meetings + /Page/Membership/meetings (dupes) | Consolidate → **About** (meetings; minutes redacted before publishing) |
| /Page/Membership/Membership | Rewrite → **Join** (add prices, renewal/e-card walkthrough, "open to everyone" inclusivity copy — keep, it's good) |
| /Packet/Join ("Colt Corral Sign Up") | Flow replaced by Givebacks → **Join** / **Give** CTAs |
| /Packet/PTSADonationGuest + /Packet/Simple Donation | → **Give** (Colt Corral; add Where the Money Goes: budget graphic, EIN) |
| /Page/Fundraising/Events | → **Calendar/Events** + event content |
| /Event (calendar) + /Event/ViewElsewhere | Replaced → **Calendar** (Google Calendar source of truth) |
| /Page/Pta/Volunteer + /Packet/VolunteerAll | Rewrite → **Volunteer** hub ("Opprotunities" typo dies here) |
| /Directory | Replaced → **Directory** explainer + opt-in state (platform TBD per PLAN §7) |
| /ContactUs | Replaced → **About** contact form (per-topic routing) |
| — (new) | **New to Mann? Start Here** — net-new page, drafts from Membership/Home/calendar PDFs |

## Post-launch pages (P5+) — migrate only with a named owner

| Current page(s) | Fate | Owner needed |
|---|---|---|
| Enrichment cluster: /Page/Activities/Enrichment, /Page/Enrichment/{Enrichment, afterschoolclasses, springclasses, policies} | Consolidate → **Programs/Enrichment** (music: choir/band/orchestra detail, scholarships, instrument loans — keep, strong content) | Enrichment chair |
| Math cluster: /Page/Enrichment/Math, /Page/Activities/Math | → **Programs/Math** (Math Challenge, Noetic, Math is Cool) | Math chair |
| Art cluster: /Page/Art/{Home, ArtDocents, Reflections, CaringForArtSupplies}, /Page/Activities/{artdocents, Reflections} (dupes) | Consolidate → **Programs/Art** | Art chair |
| /Page/Activities/Band_Orchestra | → **Programs/Enrichment** (music) | Enrichment chair |
| /Page/Activities/ScienceFair | → **Programs/Science Fair** | Chair |
| /Page/Pta/Yearbook + yearbook articles | → **Programs/Yearbook** (Lifetouch code) | Yearbook chair |
| /Page/StudentLife/hospitality, /Page/Hospitality/StaffFaves | → **Programs/Hospitality + Staff Favorites** | Hospitality chair |
| /Page/Membership/awards + /Page/Pta/Awards (dupes) | → **About/Awards** (Golden Acorn, Mannie) | Board |
| /Page/PTSA/advocacy + /Page/Pta/Legislative | → **About/Advocacy** | Advocacy chair |
| /Page/PTSA/Resources | → **About/Resources** (council/foundation links) | Board |
| /Page/Fundraising/movienight | → event page when scheduled | Events chair |
| Articles (news): Math Challenge posts, Carnival, Movie Night, etc. | Current-year items → **News** collection if News ships; else newsletter archive | Comms |
| Documents: 2025–26 calendar PDFs, Silent Auction PDF | Archive in repo `docs/archive/` (public, non-PII only); calendar PDFs superseded by live calendar | — |

## CUT (do not migrate)

- /Page/Enrichment/Springclasses2019 — stale (2019)
- /Page/Fundraising/Masks — COVID-era mask competition
- 2017–18 yearbook articles, USAgain textile recycling article — stale
- /Page/Fundraising/Printable Calendar — superseded by subscribe links
- All duplicate /Page/Pta/* vs /Page/PTSA/* variants (keep one canonical copy each, per above)
- /Packet/Spellingbee2025 — already erroring on the live site

## Redirect map (seed — finalize from crawl with exact casings)

Old OSP paths that need stubs: `/Home`, `/Event*`, `/Directory`, `/ContactUs`, `/Packet/Join`,
donation/carnival packets, and every `/Page/...` above → their new homes; everything else → smart 404.

## Still to extract from OSP admin (Track B — needs admin access)

- Membership prices (Individual/Dual) and full product catalog
- Member list + directory opt-in records (for re-consent campaign math)
- Order history (7-year financial retention), email subscriber list
- Any member-only documents (bylaws, standing rules, full minutes)
