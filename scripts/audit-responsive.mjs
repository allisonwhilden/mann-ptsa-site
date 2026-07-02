import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = process.argv[2] ?? 'shots';
mkdirSync(OUT, { recursive: true });

const pages = ['', 'start-here/', 'join/', 'give/', 'events/', 'volunteer/', 'directory/', 'about/', 'design/system/', '404'];
const viewports = [
  { name: 'mobile', width: 375, height: 750 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'laptop', width: 1280, height: 900 },
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const issues = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  for (const p of pages) {
    const slug = p === '' ? 'home' : p.replaceAll('/', '') || 'home';
    await page.goto(`http://127.0.0.1:4321/${p}`, { waitUntil: 'networkidle' });
    // horizontal overflow check
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      // find widest offenders if overflowing
      let offenders = [];
      if (overflow > 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')} right=${Math.round(r.right)}`);
            if (offenders.length >= 5) break;
          }
        }
      }
      // small tap targets (interactive elements under 40px in either dimension)
      const small = [];
      for (const el of document.querySelectorAll('a,button,summary')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.height < 40 || r.width < 40) && r.height < 40) {
          small.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }
      return { overflow, offenders, smallCount: small.length, small: small.slice(0, 6) };
    });
    if (m.overflow > 1) issues.push(`[${vp.name}] /${p} OVERFLOW ${m.overflow}px → ${m.offenders.join(' | ')}`);
    if (vp.name === 'mobile' && m.smallCount > 0) issues.push(`[${vp.name}] /${p} ${m.smallCount} small tap targets: ${m.small.join(' | ')}`);
    await page.screenshot({ path: `${OUT}/${slug}-${vp.name}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log(issues.length ? issues.join('\n') : 'NO OVERFLOW OR TAP-TARGET ISSUES');
