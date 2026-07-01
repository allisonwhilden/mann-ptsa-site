# Mann PTSA Website Rebuild — The Plan

**Goal:** Replace mannptsa.org (OurSchoolPages) with a modern, beautiful, mobile-first site managed in this GitHub repo — live before back-to-school 2026 — that a future, less-technical board can keep running.

*Plan produced July 2026 after research (current-site crawl, OurSchoolPages/WSPTA requirements, 10 peer PTSA sites, platform/vendor landscape) and three critique rounds (two multi-reviewer adversarial passes + one final consistency pass). Decisions below are final unless marked **OPEN**.*

---

## 1. Why past attempts failed → what's structurally different this time

| Past failure | Countermeasure (structural, not aspirational) |
|---|---|
| Scope too big, never finished | Launch scope is frozen at **8 pages (incl. Calendar)** (§4). Everything else has an explicit post-launch home. New ideas go to the roadmap, not the launch. |
| Ran out of time/energy | Anchored deadline: **soft launch before school starts (~Sep 1), announced at back-to-school night**. Claude does the heavy lifting (build, content drafts, migration crawl). A staging URL is live from week 1 so progress is visible. |
| Quality never good enough | A real design step (§5) *before* code: stylescapes → you pick one → build to it. Timeboxed: one round. Quality bar applies to 8 pages, not 40. Launch has a written acceptance checklist and **you are the sole approver** — the board is informed, not approving pixels. |
| Migration/cutover too hard | Migration is front-loaded (§6): domain custody is task #1, full OSP crawl/export before anything else, cutover = one DNS flip with a written rollback ("repoint DNS"). |

**Two standing rules (out of policy, permanently):**
1. **We never build custom auth or store family/kids' data in this repo or any database we run.** Member PII lives only on established platforms. (This repo is public; nothing personal ever goes in it — including git history.)
2. **One vendor per job, hard cap of 8 credentials** (full accounting in §8), every account with 2 owners and stored in a shared vault.

---

## 2. Architecture

| Concern | Decision | Why |
|---|---|---|
| Framework | **Astro (static output) + Tailwind** | Mature, low-churn, markdown-native content collections; huge ecosystem/AI familiarity for whoever maintains it in 2029. Lockfile + `.nvmrc` pinned; launch dependency budget: Astro + Tailwind (Pagefind is the one budgeted post-launch exception). |
| Hosting | **GitHub Pages** (repo → Actions → Pages) | Free, 15+ years of unchanged terms, safest ToS fit (nonprofit site with external payment links), no second hosting vendor. Netlify/Vercel rejected: 2025–26 free-tier pricing churn / non-commercial ambiguity. |
| Membership dues | **Givebacks store** (link-out) | Givebacks is WSPTA's *mandatory* membership database — every member must be entered there regardless. Selling dues there = roster entry + e-membership card automatically; selling anywhere else = hand-re-entering every member. Fees (3.95% + $0.59) can be passed to the buyer. |
| Tickets / donations / products | **Givebacks store first.** Add **one** second vendor (Zeffy 0%-fee or Cheddar Up) only if Givebacks proves inadequate for carnival tickets etc. — decided by a timed real-parent mobile checkout test, not vibes. | Vendor consolidation beats per-function optimization for a volunteer org. |
| Directory | **A platform, never custom.** Evaluate Givebacks' included directory against written pass/fail criteria (§7); if it fails, use a dedicated school-directory product (DirectorySpot / AtoZ Connect, ~$300–500/yr — pre-agreed with you, ratified in the July board vote). | Must-have feature, but custom auth + kids' PII is the worst artifact a departing volunteer can leave behind. |
| Calendar | **Google Calendar is the single source of truth** (board keeps editing what they know). Site renders a styled "upcoming events" section at build time from the public ICS feed (fail-soft: if the feed breaks, the section hides and the live-calendar link remains). Full calendar = live embed + subscribe links, always current. Rebuild cron every 6h with keepalive; RUNBOOK documents the degradation mode. | No API keys, no Google Cloud project (2026 Calendar-API quota/billing changes make keys a handoff liability). |
| Volunteer signups | Links on a single **Volunteer hub** page listing every open signup (dated list, auto-expires) — signups hosted on the commerce vendor or SignUpGenius, whichever the board already uses. | "I'm free Thursday, what needs doing?" must have one answer. |
| Newsletter (Colt Connections) | **OPEN — post-launch decision.** Default: Givebacks email (zero new vendor). Alternative: Buttondown (~$4.50/mo nonprofit). Requires SPF/DKIM/DMARC on the domain → gated on DNS custody. Signup form on the site from day 1; interim sink = form-service submissions forwarded to the communications inbox only (never stored in the repo — Rule 1). |
| Contact | One form service (e.g., Web3Forms) + spam protection, routed per-topic to committee addresses; auto-reply sets expectations ("all-volunteer, 2–3 days"). Role emails (president@ etc.) arrive with DNS custody via the DNS host's forwarding or ImprovMX (free); full Google Workspace for Nonprofits is a **post-launch** org upgrade, not a website blocker. |
| Redirects from old URLs | Astro-generated redirect stubs for the URLs actually observed in the crawl (finite list, exact casings) + a smart 404 pointing to the right sections. No Cloudflare *proxy* layer — SEO stakes for a 300-family PTSA don't justify the extra workstream (free-tier bulk redirects are case-sensitive and quota-limited anyway). Cloudflare as a plain DNS host is fine and would also cover email forwarding. |
| CMS | **None at launch** (your call — build the great site first). Content is plain markdown structured so **Pages CMS** (free, invites editors by email magic-link, no GitHub account needed) wires on in P4 — that's the succession story, scheduled, not "someday". |
| Search / analytics | Search: cut (8 pages; nav covers it; revisit when Programs tree ships). Analytics: optional GoatCounter; **the** launch metric is membership count in Givebacks by Oct 31 vs. last year. |
| Languages | English source written plain. **Translated versions of the 4 decision pages** (Join, New Families, Directory, Volunteer) in the school's top 2–3 home languages (get the real list from the school office): machine-translated + native-speaker-reviewed at launch, professionally polished as fast-follow. Prominent language banner; full i18n switcher deferred. Documented limit: vendor checkout pages stay English. |

---

## 3. Design for decay (the February test)

The site must look alive in February with zero posts since October:
- News/announcement items **auto-hide after ~6 weeks**; the section collapses to evergreen content when empty
- Fundraising thermometer has a hard end date, then auto-swaps to a thank-you
- The calendar (auto-current) is the homepage's primary freshness signal
- Every dynamic module ships with a designed empty state

---

## 4. Launch scope — the 8 pages (frozen)

1. **Home** — hero, next 3 events (auto), join CTA, seasonal slot (Colt Corral / New Families)
2. **New to Mann? Start Here** — PTSA vs school in one paragraph, key dates, join, who to email *(the acquisition page; seasonal homepage billing Aug–Oct)*
3. **Join** — benefits, **prices stated**, renewal/e-card walkthrough, → Givebacks
4. **Give** — Colt Corral + **Where the Money Goes** (budget graphic, prior-year impact, EIN for employer matching)
5. **Calendar / Events** — styled upcoming list + live calendar + subscribe
6. **Volunteer** — hub of open signups + role descriptions + "membership ≠ volunteering"
7. **Directory** — explainer, privacy policy, opt-in CTA, → platform *(ships with a designed "rebuilding — opt in now" state; see §7)*
8. **About** — mission, board, meetings + redacted minutes, contact form

**Post-launch roadmap (each page ships only with a named content owner; no owner = not built):** Programs tree (enrichment, music, art, math, science fair, reflections, yearbook, birthday book, Watch DOG) · News/newsletter archive · Awards · Advocacy · Staff Favorites · passive fundraising · Pagefind search · Pages CMS · logo refresh · enrichment registration (see §9).

---

## 5. Design process (timeboxed: ~1 week)

1. Inputs: Colts colors (from you), warm/inclusive voice (current site's tone is genuinely good — keep it), accessibility WCAG 2.2 AA, mobile-first
2. **2–3 stylescapes** (type pairing + palette + hero treatment + component samples) referencing named exemplars — Ella Baker PTSA is the district benchmark to beat — **you pick one, one revision round, done**
3. Tokens + component set (nav, hero, event card, CTA, article, footer) with empty/stale states designed in
4. Photography: recruit a parent photographer for fall events; until then, color/illustration — never stock-photo filler. **Photo policy before any child's image ships:** written consent/opt-out workflow with the school office, no names with faces, takedown contact on the site
5. Standardized "money leaves the site" pattern: consistent button + one line ("Checkout opens on Givebacks, our payment partner")

---

## 6. Timeline (anchored to back-to-school; today = July 1)

Phase map: **P1** = design (Wk 1–2) · **P2** = build (Wk 2–5) · **P3** = cutover (DNS flip **is** the soft launch) · **P4** = succession. The interim-domain fallback below is the one last-resort case where a soft launch precedes P3.

**Track A — the build (starts immediately, blocks on nothing external):**
- **Wk 1:** Full crawl + archive of mannptsa.org; content inventory; repo scaffold; staging URL live
- **Wk 1–2 (P1):** Stylescapes → your pick → design system
- **Wk 2–4 (P2):** Build 8 pages; Claude drafts all copy from crawled content (you edit); calendar wired; translations; redirect stubs
- **Wk 4–5:** Acceptance checklist (all pages complete, WCAG spot-check, real-parent mobile test, redirect verification); **1-week feedback window, you approve**
- **Soft launch when Track B unblocks DNS — target before ~Sep 1; announce at back-to-school night**

**Track B — unblocking (starts immediately, runs parallel, owned by you):**
- **Day 1 tasks:** find the domain registrar (`whois` + registrar hunt — **the one true long pole**; if OurSchoolPages controls mannptsa.org, start the transfer *now*); get OSP renewal date + data-deletion terms (sets the cutover envelope; pre-approve "pay one more year as insurance" if renewal lands badly — the insurance year buys only the export/redirect window, with a fixed cancel-and-scrub date once cutover is verified)
- **July:** OSP admin exports (member list, order history — 7-year financial retention, documents, subscriber list); Givebacks access via membership chair → evaluate store + directory vs §7 criteria; **async board approval** (email/exec-committee vote per bylaws — don't wait for a September meeting): 1-page proposal covering vendors, costs, ownership; recruit native-speaker reviewers for the 4 translated pages (school office / board network, **by Wk 3**)
- **Fallbacks if stalled:** board slow → soft-launch as "preview," announce after ratification. Givebacks eval slow → Join links to the existing join flow; Directory page ships in opt-in state. Domain stuck → escalate via WSPTA/registrar dispute; worst case launch on interim domain and 301 later (last resort).

**Cutover (P3):** DNS flip · redirects live · rollback runbook written · OSP directory data scrubbed, account cancelled at renewal (never left running "as fallback")
**P4 — Succession (the first post-launch phase, scheduled):** Pages CMS wired · RUNBOOK.md (first entry: "change a phone number using only the GitHub web editor") · second webmaster recruited · credential vault + officer-transition checklist handed to the board · SPF/DKIM/DMARC + newsletter decision

---

## 7. Directory acceptance criteria (written before we look — pass all or use a dedicated product)

- ≤4 taps from mannptsa.org to a family's phone number on mobile; no app install required
- Login session persists ≥30 days (no per-visit password ceremony)
- Searchable by child name / grade / teacher
- Per-family **opt-in**, per-field visibility control (phone/email/address), self-service revocation, fast admin removal
- Access limited to *current* members; not search-indexable; annual rollover story
- **Re-consent is a campaign, not a checkbox:** OSP consents don't transfer. Runs with the fall membership drive; the Directory page's launch state is "we're rebuilding the directory — opt in as you join."

---

## 8. Governance (right-sized, launch-gated)

- Board approval of vendors/costs recorded in minutes + recurring budget line (domain, directory product if needed)
- Shared credential vault (Bitwarden free org), ≥2 owners per account (GitHub org: you + a board role account), recovery codes stored
- Honest credential accounting — baseline 6: GitHub · registrar/DNS host · Givebacks · form service · Google (calendar) · the vault itself. Possible additions (each must be justified): directory product, second commerce vendor, newsletter ESP, email forwarder (free if the DNS host provides it). **Hard cap 8** — going past it requires displacing something (e.g., choosing Givebacks email displaces a separate ESP; DNS-host forwarding displaces ImprovMX). SignUpGenius counts only if the board actually adopts it; GoatCounter is cut unless someone owns it.

---

## 9. Known hard problem, explicitly deferred: enrichment registration

After-school class registration (payment + member early-access + discounts) is the most complex current OSP workflow. It is **not** launch scope. Stopgap is pre-designed, not improvised: Google Form + payment link + manual member check. Decision deadline tied to OSP contract end. Candidates: commerce vendor's forms, or purpose-built tools (e.g., 6crickets — used in LWSD) — evaluate in fall.

---

## 10. What I need from you (blocking items in bold, with need-by)

1. **Registrar/DNS custody hunt (Track B day 1)** — who registered mannptsa.org?
2. **OSP renewal date + admin access** for exports (day 1)
3. Givebacks contact (membership chair) so we can evaluate store + directory
4. **Colts color values / any existing brand assets (Wk 1 — blocks stylescapes)**
5. **School's actual top home languages (Wk 2 — blocks translations)**
6. PTSA EIN + group-exemption docs (employer matching page now; Google for Nonprofits later)
7. **Your pick when stylescapes are ready (end of Wk 2 — blocks the build)**

## 11. Honest uncertainties

- **Givebacks store/directory quality is unverified** — the biggest unknown; §7 criteria + the DirectorySpot/AtoZ fallback bound the risk
- Vendor fees/tiers researched via search (proxy blocked direct fetches); re-verify Zeffy/Cheddar Up/Givebacks specifics at signup time
- Whether OSP cooperates on domain transfer & data deletion — hence day-1 priority
- Community reception of link-out checkouts (mitigated by the standardized handoff pattern + real-parent test)
