import { TestBed } from '@angular/core/testing';

import { ProjectCallService } from './project-call.service';

describe(' ProjectCallService ', () => {
  let service:  ProjectCallService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( ProjectCallService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
