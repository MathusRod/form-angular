import { TestBed } from '@angular/core/testing';

import { ResetaDadosService } from './reseta-dados.service';

describe('ResetaDadosService', () => {
  let service: ResetaDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetaDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
