import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fet: FetchService, private storage: StorageService) {
    this.fet.getUserId().subscribe((data) => {
      this.uid = data;
    }, (err) => {
      console.log(err)
    });
  }

  id!: String;
  panelOpenState = false;
  uid!: string;
  myColor: string = '#673AB7';
  Message!:string;

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
    admin: ''
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchShop();
  }

  fetchShop() {
    this.fet.fetchShop(this.id).subscribe((res) => {
      if (res) {
        this.product = res;
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


  AddToCart(item: any) {
    const items = {
      ...item,
      "quantity": 1,
    }
    this.storage.addToCart(items, this.uid).subscribe(
      (response) => {
        this.Message = "Added to Cart";
        setTimeout(() => {
          this.Message = '';
        }, 2000);
      },
      (err) => {
        alert("problem here")
        this.Message = "Item missing :("
      }
    );

  }
}
