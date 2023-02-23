import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  province : any
  district : any
  ward : any
  address = {
    province : {name : "Tỉnh" , id : 0},
    district : {name : "Huyện" , id : 0},
    ward : {name : "Xã" , id : 0},
    detail : ''
  }

  constructor(
    private api : APIAny
  ) { }

  getProvince(){
    let url = environtment.url + "/address/province"
    this.api.getMapping(url,(data : any)=>{
      this.province = data
    })
  }
  getDistrict(id : any){
    let url = environtment.url + "/address/district/" + id.target.value
    this.api.getMapping(url,(data : any)=>{
      this.district = data
    })
  }
  getWard(id : any){
    let url = environtment.url + "/address/ward/" + id.target.value
    this.api.getMapping(url,(data : any)=>{
      this.ward = data
    })
  }




}

interface Prodvince{
  id : number;
  name : string;
}

interface District{
  id : number;
  name : string;
}

interface Ward{
  id : number;
  name : string;
}
