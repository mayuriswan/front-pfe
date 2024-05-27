import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleAapPostulerComponent } from './exemple-aap-postuler.component';

describe('ExempleAapPostulerComponent', () => {
  let component: ExempleAapPostulerComponent;
  let fixture: ComponentFixture<ExempleAapPostulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExempleAapPostulerComponent]
    });
    fixture = TestBed.createComponent(ExempleAapPostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
