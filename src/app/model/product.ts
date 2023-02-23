import { ActivationStart } from "@angular/router";

export interface ProductSimple {
    id : number;
    name : string;
    price : number;
    sold : number;
    avatar : string;
    category : {
        id : number;
        name : string;
    }
}

export interface ProductDetail{
  id:number;
  name:string;
  price:number;
  sold:number;
  avatar:string;
  description:string;
  quantity:number;
  picture:{name : string , id : number}[];
  category:{
    id:number;
    name:string;
  }
  status:{
    id:number;
    name:string;
  }
}
