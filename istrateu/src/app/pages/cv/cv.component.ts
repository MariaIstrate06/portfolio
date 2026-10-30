import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import your JSON data directly (make sure tsconfig.json has resolveJsonModule: true)
import cvData from './cv_data.json';

interface SectionItem {
  title: string;
  description?: string;
  text?: string;
  open?: boolean;
  period?: string;
  percentage?: string; // used in skills/languages
  level?: string;
}

interface SkillCategory {
  title: string;
  subtitle?: string;
  description?: string;
  items: SectionItem[];
}

interface Category {
  title: string;
  section?: SectionItem[];
  skillCategories?: SkillCategory[]; // only used if title === 'Skills'
  open?: boolean;
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit {
  categories: Category[] = [];

  ngOnInit(): void {
    // assign bundled JSON directly — safe for prerender
    this.categories = (cvData as unknown) as Category[];

    // ensure all categories have a defined open state
    this.categories.forEach(c => c.open = !!c.open);
    // ensure all section items in skills/languages/others have open flag
    this.categories.forEach(c => {
      if (c.skillCategories) {
        c.skillCategories.forEach(sc =>
          sc.items.forEach(i => i.open = !!i.open)
        );
      }
      if (c.section) {
        c.section.forEach(i => i.open = !!i.open);
      }
    });
  }

  toggleCategory(cat: Category) {
    cat.open = !cat.open;
  }

  toggleItem(item: SectionItem) {
    item.open = !item.open;
  }

  log(value: any) {
    console.log('LOG FUNC: ', value);
    return value;
  }

  isSkillOrLanguage(title: string): boolean {
    const check = title.toLowerCase() === 'skills' || title.toLowerCase() === 'languages';
    console.log(check);
    return check;
  }

  // helper for *ngFor trackBy
  trackByTitle(index: number, item: any) {
    return item?.title ?? index;
  }
}
