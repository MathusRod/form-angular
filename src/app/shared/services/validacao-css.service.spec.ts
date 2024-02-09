import { TestBed } from '@angular/core/testing';

import { ValidacaoCssService } from './validacao-css.service';

describe('ValidacaoCssService', () => {
  let service: ValidacaoCssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacaoCssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
