import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoThematiquesComponent } from './compo-thematiques.component';

describe('CompoThematiquesComponent', () => {
  let component: CompoThematiquesComponent;
  let fixture: ComponentFixture<CompoThematiquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoThematiquesComponent]
    });
    fixture = TestBed.createComponent(CompoThematiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
