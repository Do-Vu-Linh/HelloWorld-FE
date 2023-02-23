import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {RoleService} from "../service/role.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(
    public userService : UserService,
    public roleService : RoleService
  ){}
  ngOnInit(): void {
    this.roleService.role = "BUYER"
    this.userService.getUser()
  }

}
