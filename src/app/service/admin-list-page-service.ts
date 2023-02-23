import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment, HttpOptions } from 'src/environments/environtment';
import { Page } from 'src/environments/page';
import { ProductSimple } from '../model/product';
import { APIService } from './api.service';
import { catchError, Observable, throwError } from "rxjs";
import { Employee } from "../model/employee";
const url = environtment.url
@Injectable({
  providedIn: 'root'
})
export class AdminListPageService extends APIService<any>{
  public page!: Page<Employee>;
  public pageControl: number[] = []
  getListEmployee(pageNumber: number) {
    let httpOptions: HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      }),
      params: new HttpParams().append("page", pageNumber)
    }
    this.getOne(url + "/admin/employee-list", httpOptions).subscribe(data => {
      this.page = data
      this.renderFooter()
      this.onload.onload = false
    }

    )
  }
  changePage(pageNumber: 0) {
    this.getListEmployee(pageNumber)
  }

  nextPage() {
    this.getListEmployee(this.page.pageable.pageNumber + 1)
    this.renderFooter()
  }

  preePage() {
    this.getListEmployee(this.page.pageable.pageNumber - 1)
    this.renderFooter()
  }


  renderFooter() {
    this.pageControl = []
    let number;
    if ((number = this.page.pageable.pageNumber) >= 2) {
      for (let i = number - 2; (i <= number + 2) && (i < this.page.totalPages); i++) {
        this.pageControl.push(i)
      }
    } else {
      for (let i = 0; i < this.page.totalPages; i++) {
        this.pageControl.push(i)
      }
    }
  }

  searchListEmployee(search: string | undefined, pageNumber: number) {
    console.log("serch");

    let httpOptions: HttpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      }),
      params: new HttpParams().append("page", pageNumber)
    };
    if (search != null) {
      this.getOne(environtment.url + '/admin/searchname?searchname=' + search, httpOptions).subscribe(data => {
        this.page = data
        this.renderFooter()
        this.onload.onload = false
      })
    }

  }


}

