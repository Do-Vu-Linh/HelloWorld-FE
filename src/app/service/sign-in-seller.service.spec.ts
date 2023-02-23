import { TestBed } from '@angular/core/testing';

import { SignInSellerService } from './sign-in-seller.service';

describe('SignInSellerService', () => {
  let service: SignInSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
