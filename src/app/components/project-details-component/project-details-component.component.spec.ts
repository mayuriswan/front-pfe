import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsComponentComponent } from './project-details-component.component';

describe('ProjectDetailsComponentComponent', () => {
  let component: ProjectDetailsComponentComponent;
  let fixture: ComponentFixture<ProjectDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
