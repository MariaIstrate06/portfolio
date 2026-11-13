import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import {
  Site,
  Work,
  Video,
  Track,
  GigLog,
  Events,
  CaseStudy,
  Artist,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private cache = new Map<string, Observable<unknown>>();

  constructor(private http: HttpClient) {}

  private load<T>(file: string): Observable<T> {
    if (!this.cache.has(file)) {
      this.cache.set(
        file,
        this.http.get<T>(`assets/data/${file}`).pipe(shareReplay(1))
      );
    }
    return this.cache.get(file) as Observable<T>;
  }

  getSite(): Observable<Site> {
    return this.load<Site>('site.json');
  }

  getWorks(): Observable<Work[]> {
    return this.load<Work[]>('works.json');
  }

  getVideos(): Observable<Video[]> {
    return this.load<Video[]>('videos.json');
  }

  getTracks(): Observable<Track[]> {
    return this.load<Track[]>('tracks.json');
  }

  getGigs(): Observable<GigLog> {
    return this.load<GigLog>('gigs.json');
  }

  getArtists(): Observable<Artist[]> {
    return this.load<Artist[]>('artists.json');
  }

  getEvents(): Observable<Events> {
    return this.load<Events>('events.json');
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.load<CaseStudy[]>('case-studies.json');
  }

  getCaseStudy(slug: string): Observable<CaseStudy | undefined> {
    return this.getCaseStudies().pipe(
      map(list => list.find(c => c.slug === slug))
    );
  }
}
