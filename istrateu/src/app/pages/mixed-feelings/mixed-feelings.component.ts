import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { GigLog, Track } from '../../models';
import { Chip, ChipRowComponent } from '../../shared/components/chip-row/chip-row.component';
import { WaveformCanvasComponent } from './components/waveform-canvas/waveform-canvas.component';
import { AudioPlayerService, Stage } from './services/audio-player.service';

interface TrackEntry {
  track: Track;
  index: number;
}

const STAGE_LABELS: Record<Stage, string> = { raw: 'raw', production: 'produced', mix: 'mixed' };
const STAGE_COLORS: Record<Stage, string> = {
  raw: 'var(--text-muted)',
  production: 'var(--text)',
  mix: 'var(--green)',
};

@Component({
  selector: 'app-mixed-feelings',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ChipRowComponent, WaveformCanvasComponent],
  providers: [AudioPlayerService],
  templateUrl: './mixed-feelings.component.html',
  styleUrl: './mixed-feelings.component.css',
})
export class MixedFeelingsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private isBrowser: boolean;

  readonly filters: Chip[] = [
    { key: 'all', label: 'all' },
    { key: 'mine', label: 'my tracks' },
    { key: 'others', label: 'for others' },
  ];
  activeFilter = 'all';

  tracks: Track[] = [];
  gigLog$!: Observable<GigLog>;

  selectedIndex = 0;
  peaks: number[] = [];
  progress = 0;
  playing = false;
  duration = 0;

  constructor(
    private content: ContentService,
    public player: AudioPlayerService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.gigLog$ = this.content.getGigs();

    this.content.getTracks().subscribe(tracks => {
      this.tracks = tracks;
      if (tracks.length) this.selectTrack(0);
    });

    this.player.playing$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(p => (this.playing = p));
    this.player.duration$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(d => (this.duration = d));
    this.player.currentTime$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(t => {
      this.progress = this.duration ? t / this.duration : 0;
    });
  }

  get filteredTracks(): TrackEntry[] {
    return this.tracks
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => this.activeFilter === 'all' || track.kind === this.activeFilter);
  }

  get current(): Track | undefined {
    return this.tracks[this.selectedIndex];
  }

  get stage(): Stage {
    return this.player.stage;
  }

  get stageLabel(): string {
    return STAGE_LABELS[this.stage];
  }

  get stageColorVar(): string {
    return STAGE_COLORS[this.stage];
  }

  selectTrack(index: number): void {
    const track = this.tracks[index];
    if (!track) return;
    this.selectedIndex = index;
    this.player.loadTrack(track);
    this.loadPeaks();
  }

  toggleProduction(checked: boolean): void {
    this.player.setProduction(checked);
    this.loadPeaks();
  }

  toggleMix(checked: boolean): void {
    this.player.setMix(checked);
    this.loadPeaks();
  }

  togglePlay(): void {
    this.player.toggle();
  }

  onSeek(fraction: number): void {
    if (this.duration) this.player.seek(fraction * this.duration);
  }

  hasFile(stage: Stage): boolean {
    return !!this.current?.files[stage];
  }

  trackNumber(n: number): string {
    const num = n + 1;
    return num < 10 ? `0${num}` : `${num}`;
  }

  private loadPeaks(): void {
    if (!this.isBrowser) return;
    const src = this.player.currentSrc;
    if (!src) {
      this.peaks = [];
      return;
    }
    this.player.getPeaks(src).then(peaks => (this.peaks = peaks));
  }
}
