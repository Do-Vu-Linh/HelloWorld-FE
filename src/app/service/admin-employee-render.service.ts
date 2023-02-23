import {Injectable} from '@angular/core';
import {APIService} from "./api.service";
import {Employee} from "../model/employee";
import {EmployeeRender} from "../model/employee-Render";
import {environtment, HttpOptions} from "../../environments/environtment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { APIAny } from './api-any.service';
import { Router } from '@angular/router';

const url = environtment.url

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeRenderService{

  employeeRender !: EmployeeRender;
  constructor(
    public api : APIAny,
    public router : Router
  ){}

  public getEmployeeRender(url: string)  {

    this.api.getMapping(url,( data: any) => {
        this.employeeRender = data
      }
    )
  }

  updateEmployee(employee: Employee, action : any){
    let url = environtment.url
    this.api.putMapping(url+'/admin', employee, (data : any) => {
      action()
    })

  }
  createEmployee(employee: Employee, action : any){
    let url = environtment.url
    this.api.postMapping(url+'/admin/add', employee,(data:any) => {
      action()
      this.router.navigate(['/employee'])
    })

  }
}
