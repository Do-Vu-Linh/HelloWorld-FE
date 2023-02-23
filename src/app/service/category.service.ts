import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment, HttpOptions } from 'src/environments/environtment';
import { Category } from '../model/category';
import { APIAny } from './api-any.service';
import { APIService } from './api.service';

const url = environtment.url

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories : any

  constructor(public api : APIAny){
  }

  getAllCategory(){
    let url = environtment.url + '/categories'
    this.api.getMapping(url,(data : any)=> {
      this.categories = data
      console.log(data);
    })
  }
}
