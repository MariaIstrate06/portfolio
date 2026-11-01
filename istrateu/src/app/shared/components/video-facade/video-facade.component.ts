import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../../models';
import { ImgFallbackDirective } from '../../directives/img-fallback.directive';

function extractYouTubeId(url: string): string | null {
  const patterns = [/[?&]v=([^&]+)/, /youtube\.com\/shorts\/([^?&]+)/, /youtu\.be\/([^?&]+)/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractTikTokId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : null;
}

function extractInstagram(url: string): { type: string; id: string } | null {
  const m = url.match(/instagram\.com\/(p|reel)\/([^/?]+)/);
  return m ? { type: m[1], id: m[2] } : null;
}

/**
 * Facade pattern (brief §7): show a thumbnail + play button, mount the real
 * (and much heavier) embed only once the user actually presses play.
 */
@Component({
  selector: 'app-video-facade',
  standalone: true,
  imports: [ImgFallbackDirective],
  templateUrl: './video-facade.component.html',
  styleUrl: './video-facade.component.css',
})
export class VideoFacadeComponent {
  @Input({ required: true }) video!: Video;

  playing = false;
  safeEmbedUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  get isPlaceholder(): boolean {
    return this.video.url.trim().startsWith('[');
  }

  get youtubeId(): string | null {
    return this.video.platform.startsWith('youtube') ? extractYouTubeId(this.video.url) : null;
  }

  get thumbnail(): string | null {
    if (this.video.thumb) return this.video.thumb;
    const yid = this.youtubeId;
    return yid ? `https://i.ytimg.com/vi/${yid}/hqdefault.jpg` : null;
  }

  get externalUrl(): string | null {
    return this.isPlaceholder ? null : this.video.url;
  }

  get showExternalLink(): boolean {
    return (
      (this.video.platform === 'tiktok' || this.video.platform === 'instagram') &&
      !this.isPlaceholder
    );
  }

  get platformLabel(): string {
    return this.video.platform.replace('-', ' ');
  }

  play(): void {
    if (this.isPlaceholder || this.playing) return;

    let embed: string | null = null;
    if (this.youtubeId) {
      embed = `https://www.youtube-nocookie.com/embed/${this.youtubeId}?autoplay=1`;
    } else if (this.video.platform === 'tiktok') {
      const id = extractTikTokId(this.video.url);
      embed = id ? `https://www.tiktok.com/embed/v2/${id}` : null;
    } else if (this.video.platform === 'instagram') {
      const ig = extractInstagram(this.video.url);
      embed = ig ? `https://www.instagram.com/${ig.type}/${ig.id}/embed` : null;
    }

    // Embed couldn't be resolved (e.g. an unrecognized URL shape) — let the
    // external link (if any) be the fallback instead of a dead play button.
    if (!embed) return;

    this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.playing = true;
  }
}
