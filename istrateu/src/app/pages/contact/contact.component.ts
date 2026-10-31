import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Site } from '../../models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  site$!: Observable<Site>;
  copied = false;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.site$ = this.content.getSite();
  }

  contactByEmail(email: string): void {
    const subject = encodeURIComponent("Let's connect!");
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  copyEmail(email: string): void {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      })
      .catch(() => {
        // Ignore clipboard errors; users can still use the contact button.
      });
  }
}
