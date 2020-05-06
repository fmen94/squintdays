import { TestBed } from '@angular/core/testing';

import { GraphServiceNews } from './graph.serviceNews';

describe('GraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphServiceNews = TestBed.get(GraphServiceNews);
    expect(service).toBeTruthy();
  });
});
