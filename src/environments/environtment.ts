import { HttpHeaders, HttpParams } from "@angular/common/http";

import { ErrorLoader } from "src/app/service/onload.service";

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] },
  // observe?: 'body' | 'events' | 'response',
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
  reportProgress?: boolean,
  // responseType?: 'arraybuffer'|'blob'|'json'|'text',
  withCredentials?: boolean,
}
export const ROLE = {
  customer : "CUSTOMER",
  admin : "ADMIN",
  employee : "EMPLOYEE",
  buyer : "BUYER",
  seller : "SELLER"
}
const IP_CONFIG = {
  linh : "http://192.168.0.211:8080",
  ninh : "http://localhost:8080",
}
export const environtment = {
  url: IP_CONFIG.ninh,
  role: '',
  token: "no Token",
  firebaseConfig: {
    apiKey: "AIzaSyAunDHJ-xdqfOP75d5FZrWKFXpvRHyKw84",
    authDomain: "product-2023.firebaseapp.com",
    projectId: "product-2023",
    storageBucket: "product-2023.appspot.com",
    messagingSenderId: "110504742968",
    appId: "1:110504742968:web:face4d722781780f6f16cd",
    measurementId: "G-Y5TVVQ4178"
  }
}

export const errorLoader : ErrorLoader[] = [
  {status : 400 , name : "Request không hợp lệ", path : "/error", description : "Không có chi tiết về vấn đề này"},
  {status : 500 , name : "Đã xảy ra lỗi ở phía sever", path : "/error", description : "Không có chi tiết về vấn đề này"},
  {status : 404 , name : "Không tìm thấy địa chỉ", path : "/error", description : "Không có chi tiết về vấn đề này"},
  {status : 403 , name : "Không có quyền truy cập vào trang web", path : "/error", description : "Không có chi tiết về vấn đề này"},
]

export const path = {
  product : {
    list : '/product',
    edit : '/product/edit/',
    detail : '/product/detail/',
    adminList : '/admin-list'
  },
  employee : {
    list : '/employee',
    edit : '/employee/edit',
    detail : '/employee/detail/',
  },
  signin : {
    seller : '/sign-in/seller',
  },
  error : "/error"
}
