import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalTracksComponent } from './original-tracks.component';

describe('OriginalTracksComponent', () => {
  let component: OriginalTracksComponent;
  let fixture: ComponentFixture<OriginalTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginalTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
