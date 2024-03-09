import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-mywishlist',
  templateUrl: './mywishlist.component.html',
  styleUrls: ['./mywishlist.component.css']
})
export class MywishlistComponent {
  uid:any;
  Business: Shop[] | undefined;
  myColor: string = '#ababab';
  card: any;
  wishlist:Array<string> = [];

  constructor(private fet: FetchService, private route: Router,private store:StorageService) {
    this.fetchBusiness();
    this.fet.getUserId().subscribe((res)=>{
      this.uid = res;
    })
  }


  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (halfStar) {
      stars.push('star_half');
    }

    return stars;
  }

  fetchBusiness() {
    this.fet.fetchBusiness().subscribe((res) => {
      if (res) {
        this.Business = res;
        this.getWishlist()
      } else {
        console.warn("few problems");

      }
    })
  }

  navigateToShop(id: any) {
    this.route.navigate([`shop/${id}`])
  }

  addToWishlist(shopId: any) {
    this.store.addToWishlist(this.uid,shopId);
  }

  getWishlist(): void {
    this.fet.getWishlist(this.uid).subscribe((res) => {
      const shopKeys = Object.values(res);
      if (this.Business) {
        this.Business = this.Business.filter(shop => shopKeys.some(key => shop.id === key));
      }
    });
  }
  
  
}
