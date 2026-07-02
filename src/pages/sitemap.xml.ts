import type { APIRoute } from 'astro';

const pages = [
  '', 'start-here/', 'join/', 'give/', 'events/', 'volunteer/', 'directory/', 'about/',
  'programs/', 'programs/enrichment/', 'programs/arts/', 'programs/math/', 'programs/science-fair/', 'programs/school-life/',
];

export const GET: APIRoute = ({ site }) => {
  const base = (import.meta.env.BASE_URL as string).replace(/\/$/, '');
  const origin = site?.origin ?? 'https://mannptsa.org';
  const urls = pages
    .map((p) => `  <url><loc>${origin}${base}/${p}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
