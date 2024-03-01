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
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    this.minDate = today;
    this.maxDate = oneMonthFromNow;
  }

  ngOnInit(): void { }

  submitForm() {
    // this.bookingService.submitBooking(this.booking);
    // // You can also reset the form here if needed
    // this.booking = { date: new Date(), time: '', slots: [] };
  }


}
