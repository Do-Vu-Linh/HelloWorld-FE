import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {environtment} from 'src/environments/environtment';
import {AddressService} from '../service/address.service';
import {APIAny} from '../service/api-any.service';
import {GenderService} from '../service/gender.service';
import {SignInSellerService} from '../service/sign-in-seller.service';

@Component({
  selector: 'app-signin-seller',
  templateUrl: './signin-seller.component.html',
  styleUrls: ['./signin-seller.component.css']
})
export class SigninSellerComponent implements OnInit {

  seller = true
  url = ''

  constructor(
    public serviceSeller: SignInSellerService,
    public api: APIAny,
    public addressService: AddressService,
    public fb: FormBuilder,
    public genderService: GenderService
  ) {
  }

  ngOnInit(): void {
    this.addressService.getProvince()
  }

  setSeller() {
    this.seller = true
  }

  setBuyer() {
    this.seller = false
  }

  sellerForm = this.fb.group({
    phoneNumber: ["", [Validators.pattern('^0[0-9]{9}$'), Validators.required]],
    name: ["", [Validators.maxLength(100), Validators.required]],
    user: this.fb.group({
      username: ["", [Validators.pattern(/^([a-zA-Z0-9]{6,32})$/), Validators.required]],
      password: ["", [Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,32})$/), Validators.required]]
    }),
    repassword: ['', [Validators.required]],
    address: this.fb.group({
      province : this.fb.group({id : [0, Validators.required]}),
      district : this.fb.group({id : [0, Validators.required]}),
      ward : this.fb.group({id : [0, Validators.required]}),
      detail : ['', Validators.required]
    })
  })


  messenger = ''
  onSubmit() {
    let data: any = this.sellerForm.value
    console.log(data);
    console.log("seller form valid : " + this.sellerForm.valid);
    console.log("seller checkUserName : " + !this.checkUsername);

    if (this.sellerForm.valid && !this.checkUsername) {
      this.messenger = ''
      console.log(this.addressService.address)
      this.url = environtment.url + "/signIn/seller/" + data.user.username + '/' + data.user.password
      this.api.postMapping(this.url, data, (back: any) => {
        this.openModal()
        this.sellerForm.reset()
      })
    } else {
      this.messenger = "Thông tin của bạn chưa hợp lệ"
    }

  }
  openModal() {
    console.log("đăng ký thành công");

    let a = document.getElementById("boottrap")
    a?.click()
  }

  checkUserName() {
    setTimeout(() => {
      let url = environtment.url + "/sigin/check-user-exist/" + this.sellerForm.controls.user.controls.username.value
      this.api.getMapping(url, (data: any) => this.checkUsername = data)
    }, 1000)
  }
  checkUsername = false
}
