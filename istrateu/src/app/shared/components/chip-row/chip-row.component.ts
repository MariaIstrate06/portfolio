import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Chip {
  key: string;
  label: string;
}

/**
 * The single-select on/off pill-row idiom used by moving-frames' platform
 * filter, mixed-feelings' tracklist filter, and admin's pillar filter.
 */
@Component({
  selector: 'app-chip-row',
  standalone: true,
  imports: [],
  templateUrl: './chip-row.component.html',
  styleUrl: './chip-row.component.css',
})
export class ChipRowComponent {
  @Input() chips: Chip[] = [];
  @Input() active = '';
  @Output() activeChange = new EventEmitter<string>();

  select(key: string): void {
    if (key !== this.active) {
      this.activeChange.emit(key);
    }
  }
}
