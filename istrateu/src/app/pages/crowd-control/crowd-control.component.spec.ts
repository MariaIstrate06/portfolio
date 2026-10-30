import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdControlComponent } from './crowd-control.component';

describe('CrowdControlComponent', () => {
  let component: CrowdControlComponent;
  let fixture: ComponentFixture<CrowdControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
