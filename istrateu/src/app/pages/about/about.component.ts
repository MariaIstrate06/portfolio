import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface SectionItem {
  title: string;
  description: string;
  text?: string;
  open?: boolean;
  period?: string;
  percentage?: string; // used in skills/languages
  level?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  description: string;
  items: SectionItem[];
}

interface Category {
  title: string;
  section?: SectionItem[];
  skillCategories?: SkillCategory[]; // only used if title === 'Skills'
  open?: boolean;
}


@Component({
  selector: 'app-about',
  imports: [NgFor, NgIf, HttpClientModule],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<Category[]>('cv_data.json').subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Failed to load CV data:', err);
      },
    });
  }

  toggleCategory(cat: Category) {
    cat.open = !cat.open;
  }
  toggleItem(item: SectionItem) {
    item.open = !item.open;
  }
  log(value: any) {
    console.log("LOG FUNC: ", value);
    return value; 
  }
  isSkillOrLanguage(title: string): boolean {
    console.log(title.toLowerCase() === 'skills' || title.toLowerCase() === 'languages')
    return title.toLowerCase() === 'skills' || title.toLowerCase() === 'languages';

  }
}
