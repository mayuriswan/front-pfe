import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoPostulerComponent } from './compo-postuler.component';

describe('CompoPostulerComponent', () => {
  let component: CompoPostulerComponent;
  let fixture: ComponentFixture<CompoPostulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoPostulerComponent]
    });
    fixture = TestBed.createComponent(CompoPostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
