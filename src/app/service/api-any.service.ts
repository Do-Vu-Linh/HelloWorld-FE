import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, switchMap, throwError } from 'rxjs';
import { OnloadService } from './onload.service';

import { environtment, HttpOptions } from 'src/environments/environtment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class APIAny {

  constructor(
    private http: HttpClient,
    public onloadService: OnloadService,
    public route: Router,
    public activeRoute: ActivatedRoute
  ) { }

  httpOption: HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: environtment.token
    })
  }

  /**
   * @param header  là kiểu dữ liệu object
   * {'Content-Type': 'application/json',
      Authorization: environtment.token}
   */
  setHeader(header: any) {
    this.httpOption.headers = new HttpHeaders(header)
  }
  /**
   * set dữ liệu cho param
   */
  setParam(parm: HttpParams) {
    this.httpOption.params = parm
  }

  getMapping(url: string, action: any) {
    this.onloadService.onload = true
    this.http.get<any>(url, this.httpOption)
      .pipe(
        retry(3), catchError((err : any)=>this.handleError(err))
      ).subscribe((data) => {
        this.filterData(data, action)
        this.onloadService.onload = false
      })
  }

  /** POST: add a new object to the database */
  postMapping(url: string, object: any, action: any) {
    this.onloadService.onload = true
    this.http.post<any>(url, object, this.httpOption)
      .pipe(
        retry(3), catchError((err : any)=>this.handleError(err))
      ).subscribe((data) => {
        this.filterData(data, action)
      })
  }

  /** DELETE: delete the hero from the server */
  deleteMapping(url: string, action: any) {
    this.onloadService.onload = true
    this.http.delete<any>(url, this.httpOption)
      .pipe(
        retry(3), catchError((err : any)=>this.handleError(err))
      ).subscribe((data) => {
        this.filterData(data, action)
      })
  }

  /** PUT: update the object on the server. Returns the updated hero upon success. */
  putMapping(url: string, object: any, action: any) {
    this.onloadService.onload = true
    this.http.put<any>(url, object, this.httpOption)
      .pipe(
        retry(3), catchError((err : any)=>this.handleError(err))
      ).subscribe((data) => {
        this.filterData(data, action)
      })
  }
  // get param pathvariable
  getParam(key: string, action: any) {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      action(param.get(key))
    });
  }

  public filterData(data: any, action: any) {
    if (typeof data == 'string') {
      let message = data.split(',')
      this.onloadService.error = message
      this.route.navigate(['/error'])
    } else {
      console.log(data);
      action(data)
    }
    this.onloadService.onload = false
  }
  a = 11234

  // bắt lỗi của chương trình
  private handleError(error: HttpErrorResponse) {
    console.log(this.a);
    
    if (error.status === 0) {
      // Lỗi trả về từ client
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // Lỗi trả về từ máy chủ
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code (Xảy ra lỗi phía máy chủ) ${error.status}, body was (Dữ liệu trả về): `, error.error);
    }
    // Lỗi không rõ
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.(Lỗi không rõ)'));
  }
}
