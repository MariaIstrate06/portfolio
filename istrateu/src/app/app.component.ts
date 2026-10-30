import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({ position: 'absolute', top: 0, left: 0, width: '100%' })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(16px)' })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-12px)' }))
          ], { optional: true }),
          query(':enter', [
            animate('320ms 80ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title= 'istrateu';

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.isActivated ? outlet.activatedRoute.snapshot.url.join('/') || 'home' : '';
  }
}