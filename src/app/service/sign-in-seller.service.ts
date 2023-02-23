import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environtment';
import { APIAny } from './api-any.service';

@Injectable({
  providedIn: 'root'
})
export class SignInSellerService {

  constructor(
    public api: APIAny
  ) { }

  getProvince() {

  }
}
