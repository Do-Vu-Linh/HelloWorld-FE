import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  listSeller : any[] = []
  seller : any
  constructor(
    private api : APIAny
  ) { }

  findAllSeller(){
    let url = environtment.url + "/seller/list"
    this.api.getMapping(url, (data : any)=>{
      this.listSeller = data
    })
  }

  findAllSellerByName(name : any){
    let url = environtment.url + '/seller/name/' + name
    this.api.getMapping(url, (data : any)=>{
      this.listSeller = data
    })
  }

  setSeller(seller : any){
    this.seller = seller
  }
}
