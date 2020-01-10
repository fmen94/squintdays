import { TestBed } from '@angular/core/testing';

import { GraphserviceInstagramService } from './graphservice-instagram.service';

describe('GraphserviceInstagramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphserviceInstagramService = TestBed.get(GraphserviceInstagramService);
    expect(service).toBeTruthy();
  });
});
