import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Work } from '../../../../models';

@Component({
  selector: 'app-work-row',
  standalone: true,
  imports: [],
  templateUrl: './work-row.component.html',
  styleUrl: './work-row.component.css',
})
export class WorkRowComponent {
  @Input({ required: true }) work!: Work;
  @Input() color = '';
  @Input() canMoveUp = false;
  @Input() canMoveDown = false;

  @Output() toggled = new EventEmitter<void>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
}
