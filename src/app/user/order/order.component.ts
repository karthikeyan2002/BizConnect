import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  id: string = '';
  uid: string = '';
  order: Product[]= [];
  orderDetails:Array<object> = [];

  constructor(private route: ActivatedRoute, private router: Router, private fet: FetchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.fet.getUserId().subscribe((res) => {
      this.uid = res;
      this.fet.fetchOrder(this.id, this.uid).subscribe((result: any) => {
        for(const key in result){
          if(typeof result[key] === 'object'){
            this.order.push(result[key])
          }else{
            this.orderDetails.push(result[key])
          }
        }
        console.log(this.orderDetails);
      });
    });
    
  }

  backToOrders() {
    this.router.navigate(['order'])
  }
}
