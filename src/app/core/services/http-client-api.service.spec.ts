import { TestBed } from '@angular/core/testing';

import { HttpClientApiService } from './http-client-api.service';

describe('HttpClientApiService', () => {
  let service: HttpClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
