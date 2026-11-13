import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'hello, world | maria istrate', description: 'maria istrate: design, video, sound and the events where all of it meets.' }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: { title: 'about me | maria istrate', description: 'a creative from iași who never managed to pick just one thing.' }
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv.component').then(m => m.CvComponent),
    data: { title: 'my cv | maria istrate', description: "maria istrate's curriculum vitae." }
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work.component').then(m => m.WorkComponent),
    data: { title: 'my work | maria istrate', description: 'four ways i make things. pick one.' }
  },
  {
    path: 'work/visual-stories',
    loadComponent: () => import('./pages/visual-stories/visual-stories.component').then(m => m.VisualStoriesComponent),
    data: { title: 'visual stories | maria istrate', description: 'designs worth every pixel.' }
  },
  {
    path: 'work/moving-frames',
    loadComponent: () => import('./pages/moving-frames/moving-frames.component').then(m => m.MovingFramesComponent),
    data: { title: 'moving frames | maria istrate', description: 'objects caught in motion.' }
  },
  {
    path: 'work/mixed-feelings',
    loadComponent: () => import('./pages/mixed-feelings/mixed-feelings.component').then(m => m.MixedFeelingsComponent),
    data: { title: 'mixed feelings | maria istrate', description: 'tracks i made, produced and mixed, and the gigs where i ran the sound.' }
  },
  {
    path: 'work/crowd-control',
    loadComponent: () => import('./pages/crowd-control/crowd-control.component').then(m => m.CrowdControlComponent),
    data: { title: 'crowd control | maria istrate', description: 'events i made happen.' }
  },
  {
    path: 'receipts',
    loadComponent: () => import('./pages/receipts/receipts.component').then(m => m.ReceiptsComponent),
    data: { title: 'the receipts | maria istrate', description: 'case studies. the brief, the idea, and what actually happened.' }
  },
  {
    path: 'receipts/:slug',
    loadComponent: () => import('./pages/receipts/case-study/case-study.component').then(m => m.CaseStudyComponent),
    data: { title: 'case study | maria istrate', description: 'the brief, the idea, and what actually happened.' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: { title: 'contact | maria istrate', description: 'open to collaborations, creative projects and the occasional crazy idea.' }
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    data: { title: 'admin', description: 'admin', robots: 'noindex' }
  },

  // redirects for old links
  { path: 'portfolio', redirectTo: 'work' },
  { path: 'visual-stories', redirectTo: 'work/visual-stories' },
  { path: 'moving-frames', redirectTo: 'work/moving-frames' },

  { path: '**', redirectTo: '/home' },
];
