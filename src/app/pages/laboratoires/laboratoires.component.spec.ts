import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoiresComponent } from './laboratoires.component';

describe('LaboratoiresComponent', () => {
  let component: LaboratoiresComponent;
  let fixture: ComponentFixture<LaboratoiresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboratoiresComponent]
    });
    fixture = TestBed.createComponent(LaboratoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
