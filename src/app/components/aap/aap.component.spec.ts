import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AapComponent } from './aap.component';

describe('AapComponent', () => {
  let component: AapComponent;
  let fixture: ComponentFixture<AapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AapComponent]
    });
    fixture = TestBed.createComponent(AapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
