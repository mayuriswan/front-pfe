import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationProjectComponentComponent } from './evaluation-project-component.component';

describe('EvaluationProjectComponentComponent', () => {
  let component: EvaluationProjectComponentComponent;
  let fixture: ComponentFixture<EvaluationProjectComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationProjectComponentComponent]
    });
    fixture = TestBed.createComponent(EvaluationProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
