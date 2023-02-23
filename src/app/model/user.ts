import {Role} from "./role";
import { Status } from "./status";

export interface User {
  id : number;
  username :string;
  password : string
  role : Role;
  status : Status;

}
