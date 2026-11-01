import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Video } from '../../models';
import { Chip, ChipRowComponent } from '../../shared/components/chip-row/chip-row.component';
import { VideoFacadeComponent } from '../../shared/components/video-facade/video-facade.component';

@Component({
  selector: 'app-moving-frames',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ChipRowComponent, VideoFacadeComponent],
  templateUrl: './moving-frames.component.html',
  styleUrl: './moving-frames.component.css',
})
export class MovingFramesComponent implements OnInit {
  readonly filters: Chip[] = [
    { key: 'all', label: 'all' },
    { key: 'youtube', label: 'youtube' },
    { key: 'tiktok', label: 'tiktok' },
    { key: 'instagram', label: 'instagram' },
  ];
  active = 'all';

  videos$!: Observable<Video[]>;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.videos$ = this.content.getVideos();
  }

  private filtered(videos: Video[]): Video[] {
    // prefix match so the "youtube" filter also picks up "youtube-shorts"
    return videos.filter(v => this.active === 'all' || v.platform.startsWith(this.active));
  }

  wide(videos: Video[]): Video[] {
    return this.filtered(videos).filter(v => v.orientation === 'wide');
  }

  tall(videos: Video[]): Video[] {
    return this.filtered(videos).filter(v => v.orientation === 'vertical');
  }
}
