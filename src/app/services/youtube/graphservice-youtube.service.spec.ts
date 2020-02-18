import { TestBed } from '@angular/core/testing';

import { GraphserviceYoutubeService } from './graphservice-youtube.service';

describe('GraphserviceYoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphserviceYoutubeService = TestBed.get(GraphserviceYoutubeService);
    expect(service).toBeTruthy();
  });
});
