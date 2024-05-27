import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanceraapComponent } from './lanceraap.component';

describe('LanceraapComponent', () => {
  let component: LanceraapComponent;
  let fixture: ComponentFixture<LanceraapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanceraapComponent]
    });
    fixture = TestBed.createComponent(LanceraapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
