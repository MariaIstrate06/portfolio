import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingFramesComponent } from './moving-frames.component';

describe('MovingFramesComponent', () => {
  let component: MovingFramesComponent;
  let fixture: ComponentFixture<MovingFramesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovingFramesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
