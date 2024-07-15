import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorHomeComponent } from './evaluator-home.component';

describe('EvaluatorHomeComponent', () => {
  let component: EvaluatorHomeComponent;
  let fixture: ComponentFixture<EvaluatorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluatorHomeComponent]
    });
    fixture = TestBed.createComponent(EvaluatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
