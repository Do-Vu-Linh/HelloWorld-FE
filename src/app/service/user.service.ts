import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';
import { CartService } from './cart.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any
  cart: any[] = []

  constructor(
    public api: APIAny,
    public role: RoleService,
    public cartService: CartService
  ) { }

  getUser() {

    let url = ''

    if (this.role.role == "BUYER") {
      url = environtment.url + "/buyer/info"
    }

    if (url != '') {
      this.api.getMapping(url, (data: any) => {
        this.user = data
        this.cartService.cart = this.user.cart
        console.log(this.cartService.cart);
        
        this.cart = this.user.cart
        for(let cart of this.cart){
          cart.choice = false
          cart.amountMesseger = ''
        }
      })
    }
  }
  bill : any
  listBuy : any[] = []
  total = 0
  modalBody : any
  buy() {
    if(this.listBuy.length > 0){
      let url = environtment.url + '/buyer/cart/buy'
      this.api.putMapping(url, this.listBuy, (data : any)=>{
        this.bill = data
        document.getElementById("buysuccess")?.click()
        this.getUser()
      })
    }
  }
  choiceProduct(){
    setTimeout(()=>{
      this.listBuy = []
      this.total = 0
      for (let cart of this.cart) {
        if (cart.choice){
          this.listBuy.push(cart)
          this.total += cart.productDetail.price * cart.amount
        }
      }
    },100)
  }
  checkAlls = false
  checkAll(){
    setTimeout(()=>{
      if (this.checkAlls) {
        for (let cart of this.cart) {
          cart.choice = true
        }
      } else {
        for (let cart of this.cart) {
          cart.choice = false
        }
      }
      this.choiceProduct()
    },10)

  }

  checkCartAmount(i : any){

    if(this.cart[i].amount < 1){
      this.cart[i].amountMesseger = "Tối thiểu là 1"
      this.cart[i].amount = 1
    }else{
      let url = environtment.url + '/buyer/cart/edit-amount/' + this.cart[i].id + '/' + this.cart[i].amount
      console.log(url);

      this.api.getMapping(url, (data: any) => {
        if (!data) {
          this.cart[i].amountMesseger = "Số lượng vượt quá kho"
          this.cart[i].amount = this.cart[i].productDetail.quantity
        } else {
          this.cart[i].amountMesseger = ""
        }
      })
    }

  }
  deleteOrder(id : number) {
   let url = environtment.url + '/buyer/cart/delete/' + id
    this.api.putMapping(url,{},()=>{
      document.getElementById('modalDelete')?.click()
      this.getUser()
    });
  }
}