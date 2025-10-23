import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'navbar',
  standalone: true,   // <-- THIS makes it standalone
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink]
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // Optional: close menu on ESC or on outside click using HostListener
  @HostListener('document:keydown.escape', ['$event'])
  onEsc(): void {
    if (this.menuOpen) this.closeMenu();
  }
}
