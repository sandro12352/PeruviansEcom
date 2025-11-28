import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { inicioResolver } from './inicio.resolver';

describe('inicioResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => inicioResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
