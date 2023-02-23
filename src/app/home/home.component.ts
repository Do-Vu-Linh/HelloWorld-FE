
import {Component, OnInit} from '@angular/core';
import {ProductListPageService} from "../service/product-list-page.service";
import {CategoryService} from "../service/category.service";
import {ActivatedRoute} from "@angular/router";
import {RoleService} from "../service/role.service";
import {UserService} from "../service/user.service";
import {NavService} from "../service/nav.service";
import {ProductDetailService} from "../service/product-detail.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userService: UserService;

  constructor(public service: ProductDetailService,
              public pageService: ProductListPageService,
              public categoryService: CategoryService,
              private activeRouter: ActivatedRoute,
              public roleService: RoleService,
              userService: UserService,
              public navSerive: NavService,
              public productDetail : ProductDetailService,

              ) {
    this.userService = userService;
  }

  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  ngOnInit(): void {
    this.pageService.getListProduct(0);
  }
}
