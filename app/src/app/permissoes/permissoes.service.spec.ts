import { TestBed } from '@angular/core/testing';

import { PermissoesService } from './permissoes.service';

describe('PermissoesService', () => {
  let service: PermissoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
