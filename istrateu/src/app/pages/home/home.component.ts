import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { CaseStudy, Site, Work } from '../../models';
import { BRANCH_INFO, BRANCH_ORDER } from '../../shared/branch-info';
import { toThumbWebp } from '../../shared/image-paths';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  site$!: Observable<Site>;
  featuredWorks$!: Observable<Work[]>;
  featuredCases$!: Observable<CaseStudy[]>;

  readonly branchInfo = BRANCH_INFO;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.site$ = this.content.getSite();

    this.featuredWorks$ = this.content.getWorks().pipe(
      map(works =>
        works
          .filter(w => w.featured)
          .sort(
            (a, b) =>
              BRANCH_ORDER.indexOf(a.branch) - BRANCH_ORDER.indexOf(b.branch) || a.order - b.order
          )
      )
    );

    this.featuredCases$ = this.content.getCaseStudies().pipe(
      map(cases => cases.filter(c => c.featuredOnHome).slice(0, 3))
    );
  }

  thumb(file: string): string {
    return toThumbWebp(file);
  }
}
