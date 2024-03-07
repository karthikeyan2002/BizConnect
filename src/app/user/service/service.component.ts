import { Component } from '@angular/core';

export interface Booking {
  date: Date;
  time: string;
  slots: string[];
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  booking: Booking = { date: new Date(), time: '', slots: [] };
  minDate: Date;
  maxDate: Date;


  constructor() {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    this.minDate = today;
    this.maxDate = oneMonthFromNow;
  }

 

  submitForm() {
  }


}
