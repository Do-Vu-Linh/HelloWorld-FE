import {Province} from "./province";
import {District} from "./district";

export interface Ward {

  id :number;
  name : string;
 district :  District ;
 province :  Province;
}
