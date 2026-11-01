import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../../models';

export type Stage = 'raw' | 'production' | 'mix';

/**
 * Owns the single shared <audio> element for the mixed-feelings page:
 * stage derivation (mix implies production, per brief §7), position- and
 * play-state-preserving src swaps when the stage changes, and a per-file-URL
 * Web Audio peaks cache. Provided at the MixedFeelingsComponent level, not
 * root — it creates real browser-only resources (Audio, AudioContext) that
 * must not outlive the page.
 */
@Injectable()
export class AudioPlayerService implements OnDestroy {
  private audio?: HTMLAudioElement;
  private audioCtx?: AudioContext;
  private peaksCache = new Map<string, Promise<number[]>>();

  private track: Track | null = null;
  private prod = false;
  private mixed = false;

  readonly playing$ = new BehaviorSubject<boolean>(false);
  readonly currentTime$ = new BehaviorSubject<number>(0);
  readonly duration$ = new BehaviorSubject<number>(0);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      this.audio = new Audio();
      this.audio.addEventListener('play', () => this.playing$.next(true));
      this.audio.addEventListener('pause', () => this.playing$.next(false));
      this.audio.addEventListener('timeupdate', () => this.currentTime$.next(this.audio!.currentTime));
      this.audio.addEventListener('loadedmetadata', () => this.duration$.next(this.audio!.duration || 0));
    }
  }

  get production(): boolean {
    return this.prod;
  }

  get mix(): boolean {
    return this.mixed;
  }

  get stage(): Stage {
    return this.mixed ? 'mix' : this.prod ? 'production' : 'raw';
  }

  get currentSrc(): string | undefined {
    return this.track?.files[this.stage];
  }

  loadTrack(track: Track): void {
    this.track = track;
    // default to the most-finished stage available
    this.prod = !!track.files.production || !!track.files.mix;
    this.mixed = !!track.files.mix;
    this.applySrc(true);
  }

  setProduction(checked: boolean): void {
    this.prod = checked;
    if (!checked) {
      this.mixed = false;
    }
    this.applySrc(false);
  }

  setMix(checked: boolean): void {
    this.mixed = checked;
    if (checked) {
      this.prod = true;
    }
    this.applySrc(false);
  }

  toggle(): void {
    if (!this.audio) return;
    if (this.audio.paused) {
      this.audio.play().catch(() => {});
    } else {
      this.audio.pause();
    }
  }

  seek(time: number): void {
    if (!this.audio) return;
    this.audio.currentTime = time;
  }

  async getPeaks(url: string, bars = 64): Promise<number[]> {
    if (!this.peaksCache.has(url)) {
      this.peaksCache.set(url, this.computePeaks(url, bars));
    }
    return this.peaksCache.get(url)!;
  }

  private applySrc(resetPosition: boolean): void {
    const audio = this.audio;
    const src = this.currentSrc;
    if (!audio || !src) return;

    const wasPlaying = !audio.paused;
    const time = resetPosition ? 0 : audio.currentTime;

    const resume = () => {
      audio.currentTime = time;
      if (wasPlaying) audio.play().catch(() => {});
      audio.removeEventListener('loadedmetadata', resume);
    };
    audio.addEventListener('loadedmetadata', resume);

    audio.src = src;
    audio.load();
  }

  private async computePeaks(url: string, bars: number): Promise<number[]> {
    try {
      this.audioCtx ??= new AudioContext();
      const res = await fetch(url);
      if (!res.ok) throw new Error('audio file not available');
      const buf = await res.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(buf);
      const data = audioBuffer.getChannelData(0);
      const blockSize = Math.max(1, Math.floor(data.length / bars));
      const peaks: number[] = [];
      for (let i = 0; i < bars; i++) {
        let max = 0;
        const start = i * blockSize;
        for (let j = 0; j < blockSize; j++) {
          const v = Math.abs(data[start + j] ?? 0);
          if (v > max) max = v;
        }
        peaks.push(max);
      }
      return peaks;
    } catch {
      // audio file not present yet (Maria adds it later) — flat baseline instead of a crash
      return new Array(bars).fill(0.15);
    }
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audioCtx?.close();
  }
}
