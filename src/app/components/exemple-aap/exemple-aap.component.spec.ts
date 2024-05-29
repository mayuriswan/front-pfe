import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleAapComponent } from './exemple-aap.component';

describe('ExempleAapComponent', () => {
  let component: ExempleAapComponent;
  let fixture: ComponentFixture<ExempleAapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExempleAapComponent]
    });
    fixture = TestBed.createComponent(ExempleAapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
