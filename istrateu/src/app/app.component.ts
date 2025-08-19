import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HireMeComponent } from "./components/hire-me/hire-me.component"; 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HireMeComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title= 'istrateu';
}