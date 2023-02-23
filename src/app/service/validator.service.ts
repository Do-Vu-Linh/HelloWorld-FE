import { Injectable } from '@angular/core';
import * as moment from "moment";
interface ValidatorDate{
  before : boolean,
  after : boolean,

}
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  validatorDate : ValidatorDate = {before : false , after : false}
  constructor() { }
  // validatorBirth(event: any) {
  //   let date = event.target.value
  //   alert(date)
  //   let eighteenYearsAgo = moment().subtract(18, "years");
  //   let birthday = moment(date);
  //   if (!birthday.isValid()) {
  //     alert("invalid date");
  //   } else if (eighteenYearsAgo.isAfter(birthday)) {
  //     alert("okay, you're good");
  //   } else {
  //     this.validatorDate = ;
  //   }
  // }

  /**
   * Kiểm tra xem ngày có nhỏ hơn số năm quy định
   * @param amount : số năm quy định
   * @param date : Date cần kiểm tra
   */
  dateBefore(amount : number, date : Date){
    let subtract = moment().subtract(amount, "years");
    let dates = moment(date)
    this.validatorDate.before = subtract.isBefore(dates);
    return this.validatorDate.before
  }
  /**
   * Kiểm tra xem ngày có lớn hơn số năm quy định
   * @param amount : số năm quy định
   * @param date : Date cần kiểm tra
   */
  dateAfter(amount : number, date : Date){
    let subtract = moment().subtract(amount, "years");
    let dates = moment(date)
    this.validatorDate.after = subtract.isAfter(dates);
    return this.validatorDate.after
  }


}
