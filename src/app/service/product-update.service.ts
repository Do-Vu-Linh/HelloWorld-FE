import { Injectable } from '@angular/core';
import {ProductDetail} from "../model/product";
import {environtment, HttpOptions} from "../../environments/environtment";
import {HttpHeaders} from "@angular/common/http";
import {APIService} from "./api.service";
import {ProductDetailService} from "./product-detail.service";
const API_URL = `${environtment.url}`
const token = environtment.token
@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService extends APIService<ProductDetail>{
  public product !: ProductDetail;


//lấy 1 đối tượng productDetail thông qua id.
    editProduct(product:ProductDetail){
   // thông tin headers của reques
   let httpOptions: HttpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: token
     }),
   }
   this.put(API_URL + "/employees/product-edit/", product, httpOptions).subscribe(data=>this.product=data)
    }








}
