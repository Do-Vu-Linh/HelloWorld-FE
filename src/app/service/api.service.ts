import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { OnloadService } from './onload.service';

import {environtment, HttpOptions} from 'src/environments/environtment';
import {Employee} from "../model/employee";
const apiUrl = environtment.url
@Injectable({
  providedIn: 'root'
})
export class APIService<E> {

  constructor(
    private http : HttpClient,
    public onload : OnloadService,
    ) { }

  public getArray(url : string, httpOptions? : HttpOptions) : Observable<E[]> {
    this.onload.onload = true
    return this.http.get<E[]>(url, httpOptions).pipe(
      retry(3), // retry times after program has error
      catchError(this.handleError)
    )
  }

  getOne(url : string, httpOptions? : HttpOptions): Observable<E> {
    this.onload.onload = true
    return this.http.get<E>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public findEmployee(id : number) :Observable<Employee> {
    return this.http.get<Employee>(`${apiUrl}/admin/get-employee/${id}`).pipe(catchError(this.handleError))

  }
  public findEmployeebyName(name: string, httpOptions? : HttpOptions) :Observable<E> {
    return this.http.get<E>(`${apiUrl}/admin/searchname?searchname=`+name,httpOptions ).pipe(catchError(this.handleError))

  }


  /** POST: add a new object to the database */
  post(url : string , object : any, httpOptions? : HttpOptions): Observable<E> {
    this.onload.onload = true
    return this.http.post<E>(url, object, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete the hero from the server */
   delete(url : string, httpOptions? : HttpOptions): Observable<unknown> {
    this.onload.onload = true
    return this.http.delete(url , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update the object on the server. Returns the updated hero upon success. */
  put( url : string, object: any, httpOptions? : HttpOptions): Observable<E> {
    this.onload.onload = true
    return this.http.put<E>(url , object , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



    // bắt lỗi của chương trình
    private handleError(error: HttpErrorResponse) {
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
