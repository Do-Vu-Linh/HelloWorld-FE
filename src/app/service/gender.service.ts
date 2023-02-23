import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  genders : any
  constructor(private api : APIAny) { }
  getGender(){
    let url = environtment.url + '/gender'
    this.api.getMapping(url , (data : any)=>{
      this.genders = data
    })
  }

}
