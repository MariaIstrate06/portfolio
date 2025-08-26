import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatIconModule],   // ✅ import material icon module
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() icon!: string;
}
