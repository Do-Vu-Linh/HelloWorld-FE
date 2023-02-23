import { Component } from '@angular/core';
import {SignInSellerService} from "../service/sign-in-seller.service";
import {APIAny} from "../service/api-any.service";
import {AddressService} from "../service/address.service";
import {FormBuilder, Validators} from "@angular/forms";
import {GenderService} from "../service/gender.service";
import {environtment} from "../../environments/environtment";

@Component({
  selector: 'app-signin-buyer',
  templateUrl: './signin-buyer.component.html',
  styleUrls: ['./signin-buyer.component.css']
})
export class SigninBuyerComponent {

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
    this.genderService.getGender()
  }

  setSeller() {
    this.seller = true
  }

  setBuyer() {
    this.seller = false
  }

  buyerForm = this.fb.group({
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
    }),
    birth: ['', [Validators.required]],
    gender: this.fb.group({
      id: [0, Validators.required]
    })
  })


  messenger = ''

  onSubmit() {
    let data: any = this.buyerForm.value
    console.log(data);
    console.log("seller form valid : " + this.buyerForm.valid);
    console.log("seller checkUserName : " + !this.checkUsername);

    if (this.buyerForm.valid && !this.checkUsername && (data.repassword == data.user.password )) {
      this.messenger = ''
      console.log(this.addressService.address)
      let url = environtment.url + "/signIn/buyer/" + data.user.username + '/' + data.user.password
      this.api.postMapping(url, data, (back: any) => {
        this.openModal()
        this.buyerForm.reset()
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
      let url = environtment.url + "/sigin/check-user-exist/" + this.buyerForm.controls.user.controls.username.value
      this.api.getMapping(url, (data: any) => this.checkUsername = data)
    }, 1000)
  }
  checkUsername = false
}
