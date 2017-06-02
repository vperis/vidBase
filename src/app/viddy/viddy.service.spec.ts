/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ViddyService } from './viddy.service';

describe('ViddyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViddyService]
    });
  });

  it('should ...', inject([ViddyService], (service: ViddyService) => {
    expect(service).toBeTruthy();
  }));
});
