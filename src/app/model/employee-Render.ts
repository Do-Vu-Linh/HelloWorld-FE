import {Gender} from "./gender";
import {Position} from "./position";
import {Status} from "./status";
import {Role} from "./role";

export interface EmployeeRender {
  genders : Gender[] ;
  positions : Position[] ;
  status : Status[];
  roles : Role[];
}
