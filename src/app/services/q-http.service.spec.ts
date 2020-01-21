import { TestBed } from '@angular/core/testing';

import { QHttpService } from './q-http.service';

describe('QHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QHttpService = TestBed.get(QHttpService);
    expect(service).toBeTruthy();
  });
});
