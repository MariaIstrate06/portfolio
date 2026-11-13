import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Events } from '../../models';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-crowd-control',
  standalone: true,
  imports: [AsyncPipe, NgTemplateOutlet, RouterLink, ImgFallbackDirective],
  templateUrl: './crowd-control.component.html',
  styleUrl: './crowd-control.component.css',
})
export class CrowdControlComponent implements OnInit {
  events$!: Observable<Events>;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.events$ = this.content.getEvents();
  }
}
