import { TestBed } from '@angular/core/testing';

import { PopularDadosService } from './popular-dados.service';

describe('PopularDadosService', () => {
  let service: PopularDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
