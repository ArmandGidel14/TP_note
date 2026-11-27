import { TestBed } from '@angular/core/testing';
import { Kitsunes } from './kitsune';

describe('Kitsune', () => {
  let service: Kitsunes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kitsunes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
