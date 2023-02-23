import { Component } from '@angular/core';
import {APIAny} from "../service/api-any.service";
import {RoleService} from "../service/role.service";
import {Router} from "@angular/router";
import {environtment} from "../../environments/environtment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public api : APIAny,
    public router : Router
  ){}

  user = {
    username : '',
    password : ''
  }

  submit(){
    let url = environtment.url + '/login'
    this.api.postMapping(url, this.user, (data : any)=>{
      alert("dang ky thanh cong");
      localStorage.setItem('user_web', JSON.stringify(data))
    })
    this.router.navigate(['/'])
  }

}
