import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAapComponent } from './form-create-aap.component';

describe('FormCreateAapComponent', () => {
  let component: FormCreateAapComponent;
  let fixture: ComponentFixture<FormCreateAapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateAapComponent]
    });
    fixture = TestBed.createComponent(FormCreateAapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
