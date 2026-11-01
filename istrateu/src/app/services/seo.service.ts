import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private titleService: Title, private meta: Meta) {}

  update(data: SeoData): void {
    if (data.title) {
      this.titleService.setTitle(data.title);
      this.meta.updateTag({ property: 'og:title', content: data.title });
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }
    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
      this.meta.updateTag({ property: 'og:description', content: data.description });
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }
    if (data.robots) {
      this.meta.updateTag({ name: 'robots', content: data.robots });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }
}
