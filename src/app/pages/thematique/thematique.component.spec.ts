import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueComponent } from './thematique.component';

describe('ThematiqueComponent', () => {
  let component: ThematiqueComponent;
  let fixture: ComponentFixture<ThematiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThematiqueComponent]
    });
    fixture = TestBed.createComponent(ThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
