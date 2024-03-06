import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { BusinessService } from 'src/app/shared/services/business.service';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-mybusiness',
  templateUrl: './mybusiness.component.html',
  styleUrls: ['./mybusiness.component.css']
})
export class MybusinessComponent {



  myBusiness: object = {};
  myBusinessKeys: any;
  myShops:Array<Shop> = [];
  constructor(private bus: BusinessService, private fet: FetchService,private route:Router) {
    this.fet.getUserId().subscribe((res) => {
      this.bus.getMyBusiness(res).subscribe((result) => {
        this.myBusiness = result;
        console.log(this.myBusiness);
        this.getKeys();
        this.getShops();
      })
    })

  }

  getKeys() {
    this.myBusinessKeys = Object.values(this.myBusiness);
  }

  getShops(){
    for(let key of this.myBusinessKeys){
      this.bus.fetchMyShop(key).subscribe((res:Shop)=>{
          this.myShops.push(res)
          console.log(this.myShops);
          
      })
    }
  }

  navigateToBusinessShop(shopid:number){
    this.route.navigate([`/business/businessshop/${shopid}`])
  }

}
