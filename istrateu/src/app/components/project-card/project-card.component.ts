import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() tags: string[] = [];
  @Input() link!: string;
  @Input() imageFolder!: string;

  currentIndex = 0;

  get images(): string[] {
    return [
      `${this.imageFolder}/1.png`,
      `${this.imageFolder}/2.png`,
      `${this.imageFolder}/3.png`
    ];
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
