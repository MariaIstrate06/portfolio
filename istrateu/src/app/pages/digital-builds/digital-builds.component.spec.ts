import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBuildsComponent } from './digital-builds.component';

describe('DigitalBuildsComponent', () => {
  let component: DigitalBuildsComponent;
  let fixture: ComponentFixture<DigitalBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalBuildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
