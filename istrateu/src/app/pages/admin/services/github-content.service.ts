import { Injectable } from '@angular/core';
import { ADMIN_CONFIG } from '../admin.config';

const TOKEN_KEY = 'istrateu-admin-token';
const API_BASE = 'https://api.github.com';

export interface GithubFile<T> {
  data: T;
  sha: string;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/**
 * Admin's read/write path to GitHub's contents API. Deliberately separate
 * from ContentService (brief's plan §"Key architecture decisions") — this
 * one is authenticated, mutates a repo file, and deals in base64 + sha
 * concurrency, none of which the public JSON reads need.
 *
 * The token lives in localStorage on this device only: never logged, never
 * sent anywhere but api.github.com, never part of any commit.
 */
@Injectable({ providedIn: 'root' })
export class GithubContentService {
  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private authHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async fetchFile<T>(path: string): Promise<GithubFile<T>> {
    const url = `${API_BASE}/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${path}?ref=${ADMIN_CONFIG.branch}`;
    const res = await fetch(url, { headers: this.authHeaders() });
    if (!res.ok) {
      throw new Error(await this.describeError(res, `Could not load ${path}`));
    }
    const json = await res.json();
    const content = base64ToUtf8(json.content);
    return { data: JSON.parse(content) as T, sha: json.sha };
  }

  async saveFile<T>(path: string, data: T, sha: string, message: string): Promise<string> {
    const url = `${API_BASE}/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${path}`;
    const content = utf8ToBase64(JSON.stringify(data, null, 2) + '\n');

    const put = (withSha: string) =>
      fetch(url, {
        method: 'PUT',
        headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, content, sha: withSha, branch: ADMIN_CONFIG.branch }),
      });

    let res = await put(sha);

    if (res.status === 409) {
      // stale sha — someone else committed in the meantime. Refetch and retry once.
      const fresh = await this.fetchFile<T>(path);
      res = await put(fresh.sha);
      if (!res.ok) {
        throw new Error(
          'Someone else changed this file while you were editing. Reload the page and try again.'
        );
      }
    } else if (!res.ok) {
      throw new Error(await this.describeError(res, 'Could not save'));
    }

    const json = await res.json();
    return json.content.sha as string;
  }

  private async describeError(res: Response, prefix: string): Promise<string> {
    if (res.status === 401) return `${prefix}: the token is invalid or expired.`;
    if (res.status === 403) return `${prefix}: the token doesn't have write access to this repo.`;
    if (res.status === 404) return `${prefix}: not found (check owner/repo/path in admin.config.ts).`;
    const body = await res.json().catch(() => null);
    return `${prefix}: ${res.status} ${body?.message ?? res.statusText}`;
  }
}
