/**
 * Renders the social-share (Open Graph) image and the apple-touch icon
 * from inline HTML using the design system's look.
 * Run: node scripts/og-image.mjs   (writes into public/)
 */
import { chromium } from 'playwright';

const og = `<!doctype html><html><head><style>
  @font-face { font-family: BG; src: local('Arial Black'); }
  body{margin:0;width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;
    padding:0 90px;box-sizing:border-box;background:#FFF8F2;
    background-image:radial-gradient(circle,#14141412 2px,transparent 2.4px);background-size:34px 34px;
    font-family:'Arial Black',Arial,sans-serif;color:#141414}
  .badge{display:inline-block;background:#EF3E36;color:#fff;border:5px solid #141414;border-radius:18px;
    padding:8px 26px;font-size:34px;transform:rotate(-4deg);box-shadow:6px 6px 0 #141414;width:max-content;margin-bottom:36px}
  h1{font-size:110px;line-height:.95;margin:0 0 24px;letter-spacing:-2px}
  h1 span{color:#EF3E36}
  p{font-size:34px;font-family:Arial,sans-serif;font-weight:700;color:#3E3730;margin:0}
</style></head><body>
  <div class="badge">GO COLTS</div>
  <h1>Mann PTSA <span>· Redmond</span></h1>
  <p>Every Colt belongs here. mannptsa.org</p>
</body></html>`;

const icon = `<!doctype html><html><head><style>
  body{margin:0;width:180px;height:180px;display:grid;place-items:center;box-sizing:border-box;
    background:#EF3E36;border:12px solid #141414;border-radius:40px;
    font-family:'Arial Black',Arial,sans-serif}
  span{color:#fff;font-size:110px;font-weight:900}
</style></head><body><span>M</span></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [html, path, width, height] of [
  [og, 'public/og.png', 1200, 630],
  [icon, 'public/apple-touch-icon.png', 180, 180],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html);
  await page.screenshot({ path });
  await page.close();
  console.log('wrote', path);
}
await browser.close();
