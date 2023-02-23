import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  province : Prodvince[] = []
  district : District[] = []
  ward : Ward[] = []
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
  getDistrict(province : Prodvince){
    this.address.province = province
    let url = environtment.url + "/address/district/" + province.id
    this.api.getMapping(url,(data : any)=>{
      this.district = data
    })
  }
  getWard(district : District){
    this.address.district = district
    let url = environtment.url + "/address/ward/" + district.id
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