import { TestBed } from '@angular/core/testing';

import { GraphServiceFace } from './graph.serviceFacebook';

describe('GraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphServiceFace = TestBed.get(GraphServiceFace);
    expect(service).toBeTruthy();
  });
});
