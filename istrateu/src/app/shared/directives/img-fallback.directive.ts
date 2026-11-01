import { Directive, ElementRef, HostListener, Input } from '@angular/core';

const NEUTRAL_BOX =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#262320"/></svg>'
  );

/**
 * Missing images must show a neutral placeholder box, never a broken image
 * (brief §5/§6). Swaps to a custom fallback if given, otherwise to a flat
 * --surface-2-colored box.
 */
@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() appImgFallback = '';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    const img = this.el.nativeElement;
    const fallback = this.appImgFallback || NEUTRAL_BOX;
    if (img.src !== fallback) {
      img.src = fallback;
    }
  }
}
