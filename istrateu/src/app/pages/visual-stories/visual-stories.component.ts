import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { Work, WorkBranch } from '../../models';
import { BRANCH_INFO, BRANCH_ORDER } from '../../shared/branch-info';
import { toFullWebp, toThumbWebp } from '../../shared/image-paths';
import { LightboxComponent, LightboxItem } from '../../shared/components/lightbox/lightbox.component';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

type WorksByBranch = Record<WorkBranch, Work[]>;

@Component({
  selector: 'app-visual-stories',
  standalone: true,
  imports: [AsyncPipe, RouterLink, LightboxComponent, ImgFallbackDirective],
  templateUrl: './visual-stories.component.html',
  styleUrl: './visual-stories.component.css',
})
export class VisualStoriesComponent implements OnInit {
  readonly branches: WorkBranch[] = BRANCH_ORDER;
  readonly branchInfo = BRANCH_INFO;

  worksByBranch$!: Observable<WorksByBranch>;

  lightboxItems: LightboxItem[] = [];
  lightboxIndex = 0;
  lightboxOpen = false;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.worksByBranch$ = this.content.getWorks().pipe(
      map(works => {
        const grouped = {} as WorksByBranch;
        for (const branch of this.branches) {
          grouped[branch] = works
            .filter(w => w.branch === branch)
            .sort((a, b) => a.order - b.order);
        }
        return grouped;
      })
    );
  }

  thumb(file: string): string {
    return toThumbWebp(file);
  }

  openLightbox(branch: WorkBranch, works: Work[], index: number): void {
    this.lightboxItems = works.map(w => ({
      title: w.title,
      meta: [this.branchInfo[branch].name, w.meta].filter(Boolean).join(', '),
      image: toFullWebp(w.file),
      fallback: w.file,
      alt: w.title,
    }));
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }
}
