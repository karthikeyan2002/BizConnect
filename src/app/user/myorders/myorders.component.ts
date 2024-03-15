import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Order } from 'src/app/shared/interfaces/order.interface';


@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {

  uid: any;
  orders: Order[] = [];
  constructor(private fet: FetchService, private route: Router) { }
  isBold: boolean = true;

  ngOnInit() {
    this.fet.getUserId().subscribe((res) => {
      this.uid = res;

      this.fet.fetchOrders(this.uid).subscribe((res: { [key: string]: any }) => {
        for (let prodId in res) {

          if (res.hasOwnProperty(prodId)) {
            const sample = { id: '', time: '', completed: false,total:0 }
            sample.id = prodId;
            sample.completed = res[prodId]['status'];
            sample.time = res[prodId]['time'];
            sample.total = res[prodId]['total'];
            this.orders.push(sample)
            (this.orders);
          }


        }
      })
    })
  }

  TrackOrder(id: string) {
    this.route.navigate(['order', id])
  }
}
