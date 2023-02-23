import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSellerComponent } from './signin-seller.component';

describe('SigninSellerComponent', () => {
  let component: SigninSellerComponent;
  let fixture: ComponentFixture<SigninSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
