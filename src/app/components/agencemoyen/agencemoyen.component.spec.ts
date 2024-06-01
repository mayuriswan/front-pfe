import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencemoyenComponent } from './agencemoyen.component';

describe('AgencemoyenComponent', () => {
  let component: AgencemoyenComponent;
  let fixture: ComponentFixture<AgencemoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencemoyenComponent]
    });
    fixture = TestBed.createComponent(AgencemoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
