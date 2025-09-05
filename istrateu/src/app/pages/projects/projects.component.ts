import { Component } from '@angular/core';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-projects',
  imports: [CategoryCardComponent, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}

