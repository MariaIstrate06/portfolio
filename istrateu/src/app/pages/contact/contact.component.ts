import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    private readonly emailCharCodes = [
      109, 105, 115, 116, 114, 97, 116, 101, 48, 54, 64, 103, 109, 97, 105, 108,
      46, 99, 111, 109
    ];

    readonly instagramUrl = 'https://www.instagram.com/istrateu/';
    readonly linkedinUrl = 'https://www.linkedin.com/in/maria-istrate-0b384017b/';

    get email(): string {
      return this.emailCharCodes.map((charCode) => String.fromCharCode(charCode)).join('');
    }

    get safeEmailDisplay(): string {
      return this.email.replace('@', ' [at] ').replace('.', ' [dot] ');
    }

    contactByEmail(): void {
      const subject = encodeURIComponent("Let's connect!");
      window.location.href = `mailto:${this.email}?subject=${subject}`;
    }

    copyEmail(): void {
      navigator.clipboard.writeText(this.email).catch(() => {
        // Ignore clipboard errors; users can still use the contact button.
      });
    }

}
