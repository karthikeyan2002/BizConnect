import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { BusinessService } from 'src/app/shared/services/business.service';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-businessshop',
  templateUrl: './businessshop.component.html',
  styleUrls: ['./businessshop.component.css']
})
export class BusinessshopComponent {
  id: string = '';
  type: string = '';
  panelOpenState = false;
  uid: string = '';
  canEdit: boolean = false;

  product: Shop = {
    id: 0,
    name: '',
    src: '',
    description: '',
    addressLane1: '',
    addressLane2: '',
    city: '',
    rating: 0,
    type: 'product',
    avgPricing: '',
    category: '',
    subcategory: '',
    products: [],
    admin: '',
  };


  constructor(private route: ActivatedRoute, private fet: FetchService, private store: StorageService,private bus:BusinessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchType();
    this.fetchShop();
    this.bus.setBusinessId(this.id);
  }

  fetchType() {
    return this.fet.fetchType(this.id).subscribe((res) => {
      this.type = res;
    })
  }

  fetchShop() {
    this.fet.fetchShop(this.id).subscribe((res) => {
      if (res) {
        this.product = res;
        this.fet.getUserId().subscribe((res) => {
          this.uid = res;
          if (this.uid == this.product.admin) {
            this.canEdit = true;
          }
        })
      }
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

  updateChanges() {
    this.store.updateShop(this.id, this.product).subscribe(() => {
    }, (err) => {
      console.warn("Error Occured in Failure");
      
    })

  }
}
