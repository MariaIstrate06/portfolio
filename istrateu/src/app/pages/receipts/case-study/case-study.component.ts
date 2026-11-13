import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ContentService } from '../../../services/content.service';
import { SeoService } from '../../../services/seo.service';
import { CaseStudy } from '../../../models';
import { ImgFallbackDirective } from '../../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ImgFallbackDirective],
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.css'],
})
export class CaseStudyComponent implements OnInit {
  caseStudy$!: Observable<CaseStudy | undefined>;
  nextCase$!: Observable<CaseStudy | undefined>;

  constructor(
    private route: ActivatedRoute,
    private content: ContentService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.caseStudy$ = this.route.paramMap.pipe(
      map(params => params.get('slug') ?? ''),
      switchMap(slug => this.content.getCaseStudy(slug)),
      tap(cs => {
        if (cs) {
          this.seo.update({
            title: `${cs.project} | maria istrate`,
            description: cs.hook,
          });
        }
      })
    );

    this.nextCase$ = this.caseStudy$.pipe(
      switchMap(current =>
        this.content.getCaseStudies().pipe(
          map(all => {
            if (!current || all.length < 2) return undefined;
            const idx = all.findIndex(c => c.slug === current.slug);
            return all[(idx + 1) % all.length];
          })
        )
      )
    );
  }
}
