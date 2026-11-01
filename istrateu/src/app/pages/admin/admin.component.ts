import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADMIN_CONFIG } from './admin.config';
import { GithubContentService } from './services/github-content.service';
import { Work, WorkBranch } from '../../models';
import { BRANCH_INFO } from '../../shared/branch-info';
import { Chip, ChipRowComponent } from '../../shared/components/chip-row/chip-row.component';
import { WorkRowComponent } from './components/work-row/work-row.component';

type SaveState = 'idle' | 'saving' | 'success' | 'error';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ChipRowComponent, WorkRowComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  tokenInput = '';
  hasToken = false;

  loading = false;
  loadError = '';
  works: Work[] = [];
  private sha = '';

  readonly filters: Chip[] = [
    { key: 'all', label: 'all' },
    { key: 'digital', label: 'digital' },
    { key: 'print', label: 'print' },
    { key: 'social', label: 'social media' },
    { key: 'leadership', label: 'creative leadership' },
  ];
  activeFilter = 'all';

  saveState: SaveState = 'idle';
  saveError = '';

  readonly branchInfo = BRANCH_INFO;

  constructor(private github: GithubContentService) {}

  ngOnInit(): void {
    this.hasToken = this.github.hasToken();
    if (this.hasToken) {
      this.loadWorks();
    }
  }

  submitToken(): void {
    const token = this.tokenInput.trim();
    if (!token) return;
    this.github.setToken(token);
    this.tokenInput = '';
    this.hasToken = true;
    this.loadWorks();
  }

  forgetToken(): void {
    this.github.clearToken();
    this.hasToken = false;
    this.works = [];
    this.saveState = 'idle';
  }

  get visibleWorks(): Work[] {
    return this.works.filter(w => this.activeFilter === 'all' || w.branch === this.activeFilter);
  }

  get featuredCount(): number {
    return this.works.filter(w => w.featured).length;
  }

  colorFor(branch: WorkBranch): string {
    return this.branchInfo[branch].bg;
  }

  toggleFeatured(work: Work): void {
    work.featured = !work.featured;
    if (work.featured) {
      const maxOrder = this.works.reduce((max, w) => Math.max(max, w.order ?? 0), 0);
      work.order = maxOrder + 10;
    }
    this.saveState = 'idle';
  }

  isFirstFeatured(work: Work): boolean {
    return this.featuredSortedAll[0] === work;
  }

  isLastFeatured(work: Work): boolean {
    const list = this.featuredSortedAll;
    return list[list.length - 1] === work;
  }

  moveUp(work: Work): void {
    const list = this.featuredSortedAll;
    const idx = list.indexOf(work);
    if (idx <= 0) return;
    const prev = list[idx - 1];
    [work.order, prev.order] = [prev.order, work.order];
    this.saveState = 'idle';
  }

  moveDown(work: Work): void {
    const list = this.featuredSortedAll;
    const idx = list.indexOf(work);
    if (idx === -1 || idx >= list.length - 1) return;
    const next = list[idx + 1];
    [work.order, next.order] = [next.order, work.order];
    this.saveState = 'idle';
  }

  async save(): Promise<void> {
    this.saveState = 'saving';
    this.saveError = '';
    try {
      this.sha = await this.github.saveFile(
        ADMIN_CONFIG.worksPath,
        this.works,
        this.sha,
        'admin: update featured works'
      );
      this.saveState = 'success';
    } catch (e) {
      this.saveState = 'error';
      this.saveError = e instanceof Error ? e.message : 'failed to save changes.';
    }
  }

  private get featuredSortedAll(): Work[] {
    return this.works.filter(w => w.featured).sort((a, b) => a.order - b.order);
  }

  private async loadWorks(): Promise<void> {
    this.loading = true;
    this.loadError = '';
    try {
      const file = await this.github.fetchFile<Work[]>(ADMIN_CONFIG.worksPath);
      this.works = file.data;
      this.sha = file.sha;
    } catch (e) {
      this.loadError = e instanceof Error ? e.message : 'failed to load works.json.';
    } finally {
      this.loading = false;
    }
  }
}
