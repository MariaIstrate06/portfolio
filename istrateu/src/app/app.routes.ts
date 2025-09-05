import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: 'digital-builds', 
    loadComponent: () => import('./pages/digital-builds/digital-builds.component')
      .then(m => m.DigitalBuildsComponent) 
  },
  { 
    path: 'visual-stories', 
    loadComponent: () => import('./pages/visual-stories/visual-stories.component')
      .then(m => m.VisualStoriesComponent) 
  },
  { 
    path: 'moving-frames', 
    loadComponent: () => import('./pages/moving-frames/moving-frames.component')
      .then(m => m.MovingFramesComponent) 
  },
  { 
    path: 'original-tracks', 
    loadComponent: () => import('./pages/original-tracks/original-tracks.component')
      .then(m => m.OriginalTracksComponent) 
  },
  { 
    path: 'portfolio', 
    loadComponent: () => import('./pages/projects/projects.component')
      .then(m => m.ProjectsComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component')
      .then(m => m.AboutComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component')
      .then(m => m.ContactComponent) 
  },
  
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' },

];
