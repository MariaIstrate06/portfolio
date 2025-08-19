import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  imports: [NavbarComponent],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'

})
export class AboutComponent {

}
