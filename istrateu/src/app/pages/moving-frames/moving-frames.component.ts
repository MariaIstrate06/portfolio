import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoFrame {
  title: string;
  description: string;
  embedUrl: string;
}

@Component({
  selector: 'app-moving-frames',
  imports: [CommonModule],
  templateUrl: './moving-frames.component.html',
  styleUrl: './moving-frames.component.css'
})
export class MovingFramesComponent {
  // Replace embedUrl with your own links, title/description are yours to write:
  // YouTube -> https://www.youtube.com/embed/VIDEO_ID
  // Drive    -> https://drive.google.com/file/d/FILE_ID/preview
  videos: VideoFrame[] = [
    { title: 'City Lights Reel', description: 'A late-night walk through downtown, cut to the rhythm of the traffic.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Motion Study No. 3', description: 'Experimenting with parallax layers and long exposure light trails.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Coastline Drift', description: 'Drone footage stitched together to follow a single tide as it rolls in.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Backstage Cut', description: 'Behind-the-scenes edit from a live show — all handheld, all real.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Colors in Motion', description: 'A color-grading exercise built around a single rainy afternoon.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Street Portraits', description: 'Short interviews woven together into one continuous walk.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Studio Session', description: 'Multi-camera edit from a recording session, synced to the final mix.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Rooftop Timelapse', description: 'A full day compressed into ninety seconds from a single fixed frame.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Product Teaser', description: 'A thirty-second teaser built around texture, light and negative space.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Dance Rehearsal', description: 'Raw rehearsal footage edited into a tight, percussive sequence.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Night Drive', description: 'A dash-cam-style piece exploring reflections and passing light.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Market Morning', description: 'Sound design led edit following the opening hour of a local market.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Short Film — Echoes', description: 'A five-minute narrative short shot over a single weekend.', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  platform(url: string): 'youtube' | 'drive' | 'video' {
    if (url.includes('youtube') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('drive.google')) return 'drive';
    return 'video';
  }
}
