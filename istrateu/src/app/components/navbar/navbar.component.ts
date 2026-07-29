import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,   // <-- THIS makes it standalone
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink]
})
export class NavbarComponent {
  menuOpen = false;
  spinBandAid = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onHomeClick(): void {
    if (this.router.url === '/home') {
      // already here — spin the band-aid instead of navigating away,
      // and keep the mobile menu open so the animation is actually visible.
      this.spinBandAid = false;
      setTimeout(() => { this.spinBandAid = true; });
      return;
    }
    this.closeMenu();
  }

  // Optional: close menu on ESC or on outside click using HostListener
  @HostListener('document:keydown.escape', ['$event'])
  onEsc(): void {
    if (this.menuOpen) this.closeMenu();
  }
}
