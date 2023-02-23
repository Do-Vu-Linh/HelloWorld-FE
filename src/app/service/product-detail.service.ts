import { Injectable } from '@angular/core';
import { environtment } from "../../environments/environtment";
import { ProductDetail } from "../model/product";
import { APIAny } from './api-any.service';
import { CartService } from './cart.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FireBaseService } from './fire-base.service';
import { upFileArray } from 'src/environments/firebase';
import { OnloadService } from './onload.service';


const API_URL = `${environtment.url}`
const token = environtment.token
@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  public product !: ProductDetail;
  public seller: any

  constructor(
    public api: APIAny,
    public cartService: CartService,
    public fireService: FireBaseService,
    public onLoad: OnloadService,
  ) { }


  getProductDetail(id: number, action?: any) {
    let url = API_URL + "/employees/product-detail/" + id
    this.api.getMapping(url, (data: any) => {
      this.product = data
      let urlSeller = API_URL + "/product/seller/" + data.id
      this.api.getMapping(urlSeller, (seller: any) => {
        this.seller = seller
      })
      action(data)
    })
  }

  addProductDetail(productDetail: any, action: any) {
    let url = API_URL + "/employees/product-create/"
    this.api.postMapping(url, productDetail, action)
  }

  updateProductDetail(productDetail: any, action: any) {
    let url = API_URL + "/employees/product-edit/" + productDetail.id
    this.api.putMapping(url, productDetail, action)
  }

  modalMesager: any
  toCart() {
    let url = API_URL + `/buyer/to-cart/${this.product.id}/${this.amount}`
    this.api.postMapping(url, {}, (data: any) => {
      this.cartService.cart = data
      this.amount = 1
      document.getElementById('modal')?.click()
    })
  }

  amount: number = 0
  amountMessage = ''
  setAmount(value: number) {
    this.amountMessage = ''
    if (value < 0) {
      this.amountMessage = "Không thể giảm"
      return this.amount = 0
    }
    if (value > this.product.quantity) {
      this.amountMessage = "Sản phẩm này đã đạt tối đa"
      return this.amount = this.product.quantity
    }
    return this.amount = value
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.product.picture, event.previousIndex, event.currentIndex);
  }
  selectPicture(file: any) {
    this.pictrueMessenge = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`

    this.fireService.selectFile(file)
    upFileArray(this.fireService.files, () => {
      for (let file of this.fireService.files) {
        this.product.picture.push({ name: file.url, id: 0 })
      }
      this.pictrueMessenge = ''
    })
  }
  deletePicture(index: any) {
    this.product.picture.splice(index, 1)
  }

  indexImg: any;
  setAvatar() {
    let file = this.product.picture[this.indexImg]
    this.product.picture.splice(this.indexImg, 1)
    this.product.picture.unshift(file)
  }

  pictrueMessenge = ""
  savePicture() {
    let url = API_URL + "/product/editPicture/" + this.product.id
    this.api.putMapping(url, this.product.picture, () => {
      this.pictrueMessenge = "Thay đổi thành công"
      setTimeout(() => {
        this.pictrueMessenge = ""
      }, 3000)
    })
  }


}
