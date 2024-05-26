import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmanagerComponent } from './usersmanager.component';

describe('UsersmanagerComponent', () => {
  let component: UsersmanagerComponent;
  let fixture: ComponentFixture<UsersmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersmanagerComponent]
    });
    fixture = TestBed.createComponent(UsersmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
