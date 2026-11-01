import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-waveform-canvas',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './waveform-canvas.component.html',
  styleUrl: './waveform-canvas.component.css',
})
export class WaveformCanvasComponent implements AfterViewInit, OnChanges {
  @Input() peaks: number[] = [];
  @Input() progress = 0;
  @Input() color = 'var(--text-muted)';
  @Output() seek = new EventEmitter<number>();

  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    requestAnimationFrame(() => this.draw());
  }

  ngOnChanges(): void {
    if (!this.isBrowser) return;
    this.draw();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.seek.emit(Math.min(1, this.progress + 0.05));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.seek.emit(Math.max(0, this.progress - 0.05));
    }
  }

  onClick(e: MouseEvent): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    this.seek.emit(Math.min(1, Math.max(0, fraction)));
  }

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const barCount = this.peaks.length || 48;
    const peaks = this.peaks.length ? this.peaks : new Array(barCount).fill(0.15);
    const maxPeak = Math.max(...peaks, 0.001);
    const gap = 2;
    const barWidth = (width - gap * (barCount - 1)) / barCount;
    const resolvedColor = this.resolveColor();

    peaks.forEach((p, i) => {
      const barHeight = Math.max(2, (p / maxPeak) * height);
      const x = i * (barWidth + gap);
      const y = (height - barHeight) / 2;
      const played = this.progress > 0 && x / width <= this.progress;
      ctx.globalAlpha = played ? 1 : 0.45;
      ctx.fillStyle = resolvedColor;
      ctx.fillRect(x, y, barWidth, barHeight);
    });
    ctx.globalAlpha = 1;
  }

  private resolveColor(): string {
    if (!this.color.startsWith('var(')) return this.color;
    const varName = this.color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return resolved || '#a8a196';
  }
}
