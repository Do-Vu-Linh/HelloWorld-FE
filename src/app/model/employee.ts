import {Timestamp} from "rxjs";
import {Position} from "./position";
import {Gender} from "./gender";
import {Status} from "./status";
import {User} from "./user";

export interface Employee {
  id : number;
  name: string;
  birth : Date;
  age : number;

  phoneNumber : string;
  position : Position;
  gender : Gender;
  user : User;

}
