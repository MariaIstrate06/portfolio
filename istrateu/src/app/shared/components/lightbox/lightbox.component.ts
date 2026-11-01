import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

export interface LightboxItem {
  title: string;
  meta: string;
  image: string;
  fallback: string;
  alt: string;
}

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css',
})
export class LightboxComponent implements AfterViewInit, OnDestroy {
  @Input() items: LightboxItem[] = [];
  @Input() index = 0;
  @Output() closed = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  private touchStartX = 0;
  private previousOverflow = '';

  get current(): LightboxItem | undefined {
    return this.items[this.index];
  }

  ngAfterViewInit(): void {
    this.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.panelRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = this.previousOverflow;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'ArrowRight') {
      this.next();
    } else if (e.key === 'ArrowLeft') {
      this.prev();
    } else if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  }

  close(): void {
    this.closed.emit();
  }

  next(): void {
    this.go((this.index + 1) % this.items.length);
  }

  prev(): void {
    this.go((this.index - 1 + this.items.length) % this.items.length);
  }

  private go(i: number): void {
    this.index = i;
    this.indexChange.emit(i);
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40 && this.items.length > 1) {
      dx < 0 ? this.next() : this.prev();
    }
  }

  private trapFocus(e: KeyboardEvent): void {
    const root = this.panelRef?.nativeElement;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
