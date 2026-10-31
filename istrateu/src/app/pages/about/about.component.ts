import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Site } from '../../models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  site$!: Observable<Site>;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.site$ = this.content.getSite();
  }
}
