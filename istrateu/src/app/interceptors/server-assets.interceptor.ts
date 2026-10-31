import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { of } from 'rxjs';

/**
 * During SSR/prerendering there is no real HTTP server to resolve relative
 * asset URLs against (no window.location, no incoming request to infer an
 * origin from) — `HttpClient.get('assets/data/site.json')` would otherwise
 * fail outright. Serve those requests straight from the `public/` folder on
 * disk instead. Server-only: this file is wired up exclusively from
 * app.config.server.ts, so it never ships in the browser bundle.
 */
export const serverAssetsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!/^https?:\/\//i.test(req.url)) {
    const filePath = join(process.cwd(), 'public', req.url);
    if (existsSync(filePath)) {
      const body = req.url.endsWith('.json')
        ? JSON.parse(readFileSync(filePath, 'utf-8'))
        : readFileSync(filePath);
      return of(new HttpResponse({ status: 200, body }));
    }
  }
  return next(req);
};
