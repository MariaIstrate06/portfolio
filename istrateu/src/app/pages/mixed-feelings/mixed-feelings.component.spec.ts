import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedFeelingsComponent } from './mixed-feelings.component';

describe('MixedFeelingsComponent', () => {
  let component: MixedFeelingsComponent;
  let fixture: ComponentFixture<MixedFeelingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedFeelingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixedFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
