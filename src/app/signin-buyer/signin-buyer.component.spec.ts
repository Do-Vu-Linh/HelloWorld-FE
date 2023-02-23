import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninBuyerComponent } from './signin-buyer.component';

describe('SigninBuyerComponent', () => {
  let component: SigninBuyerComponent;
  let fixture: ComponentFixture<SigninBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
