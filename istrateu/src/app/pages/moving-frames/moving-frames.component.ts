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
    { title: 'TEDxIasi 2024', description: 'Shot, directed, color graded and edited', embedUrl: 'https://www.youtube.com/embed/Zazij9LNtAY' },
    { title: 'Short Video Documentary', description: 'Shot, directed, color graded and edited', embedUrl: 'https://www.youtube.com/embed/VhS5P_HbBeQ' },
    { title: 'Motion Lyrics Video', description: 'Edited', embedUrl: 'https://www.youtube.com/embed/r01T7p3PCsw' },
    { title: 'Promotional Video - Escape Land', description: 'Edited', embedUrl: 'https://www.youtube.com/embed/ZF_SRc_7lhk' },
    { title: 'Promotional Video - Drive in', description: 'Shot, edited', embedUrl: 'https://www.youtube.com/embed/65DFe5O06rA' },
    { title: 'Aftermovie - CDR25', description: 'Shot, edited', embedUrl: 'https://www.youtube.com/embed/5jIWTyK3np8' },
    { title: 'Safety driving campaigns', description: 'Scripted, shot, directed, color graded & edited', embedUrl: 'https://www.youtube.com/embed/REESHi9TmmA' }
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
