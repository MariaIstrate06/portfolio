import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface SectionItem {
  title: string;
  text?: string;
  open?: boolean;
}

interface Category {
  title: string;
  section?: SectionItem[];
  open?: boolean;
}

@Component({
  selector: 'app-about',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'

})
export class AboutComponent {

  educations: SectionItem[] = [
    {
      title: "Master's Degree - Computational Linguistics",
      text: `University "Alexandru Ioan Cuza" of Iași <i>Graduation: 2026</i>`,
      open: false
    },
    {
      title: "Bachelor's Degree - Computer Science",
      text: `University "Alexandru Ioan Cuza" of Iași <i>Graduation: 2021</i>`,
      open: false
    }
  ];

  workExperiences: SectionItem[] = [
    {
      title: "Software Engineer",
      text: `I am currently working as a Software Engineer at in Iași, Romania.`,
      open: false
    },
    {
      title: "Internship - Software Engineer",
      text: `I completed an internship as a Software Engineer at in Iași, Romania.`,
      open: false
    }
  ];

  categories: Category[] = [
    {
      title: "Work Experience",
      section: this.workExperiences,
      open: false,
    },
    {
      title: "Education",
      section: this.educations,
      open: false,
    },
    {
      title: "Skills",
      section: [
        { title: "Programming", text: "Angular, TypeScript, Python, JavaScript", open: false },
        { title: "Tools", text: "Git, Docker, VSCode", open: false }
      ],
      open: false
    },
    {
      title: "Languages",
      section: [
        { title: "Romanian", text: "Native", open: false },
        { title: "English", text: "Fluent", open: false }
      ],
      open: false
    },
    {
      title: "Volunteering",
      section: [
        { title: "Local NGO", text: "Organized community events and workshops", open: false }
      ],
      open: false
    }
  ]


   toggleCategory(cat: Category) {
    cat.open = !cat.open;
  }

  toggleItem(item: SectionItem) {
    item.open = !item.open;
  }
}
