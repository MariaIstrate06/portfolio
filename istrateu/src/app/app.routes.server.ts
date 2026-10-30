import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'receipts/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        const file = join(process.cwd(), 'public/assets/data/case-studies.json');
        const caseStudies = JSON.parse(readFileSync(file, 'utf-8')) as { slug: string }[];
        return caseStudies.map(cs => ({ slug: cs.slug }));
      } catch {
        // case-studies.json doesn't exist yet (seeded in phase 3) — prerender nothing for now.
        return [];
      }
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
