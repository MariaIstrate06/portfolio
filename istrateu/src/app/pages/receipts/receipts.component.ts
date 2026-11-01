import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { CaseStudy } from '../../models';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ImgFallbackDirective],
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit {
  caseStudies$!: Observable<CaseStudy[]>;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.caseStudies$ = this.content.getCaseStudies();
  }
}
