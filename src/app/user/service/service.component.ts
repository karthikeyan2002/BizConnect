import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyBooking } from 'src/app/business/businessservice/businessservice.component';
import { BusinessService } from 'src/app/shared/services/business.service';

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

  slot:Array<string>=[];
  
  selectedSlots: { slotName: string, timing: string, available: boolean }[] = [{ 'slotName': 'Morning Slot', 'timing': '10AM TO 11AM', 'available': true }];
  selectedSlotName: string = '';
  selectedTiming: string = '';
  selectedAvailable: boolean = false;

  minDate: Date;
  maxDate: Date;
  shopid:any;

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

  constructor(private bus:BusinessService,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.shopid = params['id'];
    });
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    this.minDate = today;
    this.maxDate = oneMonthFromNow;

    this.bus.getTypeOfService(this.shopid).subscribe((res)=>{
      this.slot = Object.values(res)
    })
  }

  logSelectedSlots() {
    this.bus.updateTypeOfService(this.shopid,this.slot).subscribe(()=>{
      console.log("done success");
      
    })
  }

  submitEventForm() {
    
    this.bus.updateTypeOfService(this.shopid,this.slot).subscribe(()=>{
      console.log("done success");
      
    })
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

  submitForm() {
  }


}
