import { Component } from '@angular/core';

export interface DailyBooking {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-businessservice',
  templateUrl: './businessservice.component.html',
  styleUrls: ['./businessservice.component.css']
})
export class BusinessserviceComponent {
  slot: string[] = [];
  selectedSlots: { slotName: string, timing: string, available: boolean }[] = [{'slotName':'Morning Slot','timing':'10AM TO 11AM','available':true}];
  selectedSlotName: string = '';
  selectedTiming: string = '';
  selectedAvailable: boolean = false;

  minDate: Date;
  maxDate: Date;

  dataSource: DailyBooking[] = [
    { time: '10:00 AM', available: true },
    { time: '10:15 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '10:45 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '11:15 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '11:45 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '12:15 PM', available: false },
  ];

  displayedColumns: string[] = ['time', 'available'];
  selectedColumns: string[] = ['slotName', 'timing', 'available'];

  constructor() {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    this.minDate = today;
    this.maxDate = oneMonthFromNow;
  }

  logSelectedSlots() {
    console.log(this.slot);
  }

  submitEventForm() {
    // Implement event form submission logic here
  }

  submitDailyForm() {
    // Implement daily form submission logic here
  }

  submitSelectedForm() {
    this.selectedSlots.push({
      slotName: this.selectedSlotName,
      timing: this.selectedTiming,
      available: this.selectedAvailable
    });
    this.selectedSlotName = '';
    this.selectedTiming = '';
    this.selectedAvailable = false;
  }
}
