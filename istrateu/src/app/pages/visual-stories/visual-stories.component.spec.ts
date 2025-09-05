import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualStoriesComponent } from './visual-stories.component';

describe('VisualStoriesComponent', () => {
  let component: VisualStoriesComponent;
  let fixture: ComponentFixture<VisualStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
