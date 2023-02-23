import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';
import { RoleService } from './role.service';


const url = environtment.url
const categoryDefaut = {name : "Thể loại", id : 0}

@Injectable({
  providedIn: 'root'
})
export class ProductListPageService{
  url = url + "/employees/product-list"

  constructor (
    private api : APIAny,
    private router : Router,
    private roleService : RoleService
  ){}

  public page: any;
  public pageControl : number[] = []

  getListProduct(pageNumber : number) {
    this.api.setParam(new HttpParams().append("page", pageNumber))
    console.log(this.url);
    this.api.getMapping(this.url, (data : any) => {
      this.page = data
      this.renderFooter()
    })
  }

  getSearchByNameCategoryFilter(name : any){
    this.rangeChoice = -1
    this.url = url + "/product/filter/" + name
    this.getListProduct(0)
  }

  category : any = {name : 'Thể Loại' , id : 0}
  getCategoryFilter(category : any){
    this.rangeChoice = -1
    this.url = url + '/employees/list/category/' + category.id
    this.category = category
    this.getListProduct(0)
  }




  nextPage(){
    this.getListProduct(this.page.pageable.pageNumber + 1)
  }

  preePage(){
    this.getListProduct(this.page.pageable.pageNumber - 1)
  }


  renderFooter(){
    this.pageControl = []
    let number;
    if(( number = this.page.pageable.pageNumber) >= 2){
      for(let i = number - 2 ; (i <= number + 2) && (i < this.page.totalPages) ; i++ ){
        this.pageControl.push(i)
      }
    }else{
      for(let i = 0; i < this.page.totalPages ; i++){
        this.pageControl.push(i)
      }
    }
  }

  rangeChoice = -1;
  range = [
    { min: 0, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 20000 },
    { min: 20000, max: 50000 },
  ]
  rangePriceFilter(i : any){
    this.url = environtment.url + '/employees/price/' + this.range[i].min + '/' + this.range[i].max
    this.category = {name : 'Thể Loại' , id : 0}
    this.rangeChoice = i
    this.getListProduct(0)
  }


  modalMessager : any
  deleteProduct(id : any){
    let url = environtment.url + '/employees/product-delete/' + id
    this.api.deleteMapping(url, (data : any)=>{
      this.modalMessager = "Xóa thành công"
      document.getElementById('modal')?.click()
      this.getListProduct(0)
    })
  }




}
