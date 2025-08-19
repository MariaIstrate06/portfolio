import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'navbar',
  standalone: true,   // <-- THIS makes it standalone
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink]
})
export class NavbarComponent {}
