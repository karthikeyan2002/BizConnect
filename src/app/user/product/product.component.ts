import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  id!: String;
  panelOpenState = false;
  uid!: string;
  myColor: string = '#673AB7';
  Message!: string;
  products: Product[] = [];
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private route: ActivatedRoute, private fet: FetchService, private storage: StorageService, private _snackBar: MatSnackBar) {
    this.fet.getUserId().subscribe((data) => {
      this.uid = data;
      this.fechProduct();
    }, (err) => {
      (err)
    });

  }

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
      this.openSnackBar();

      },
      (err) => {
        alert("problem here")
        this.Message = "Item missing :("
      }
    );

  }

  fechProduct() {
    this.fet.fetchProducts(this.id).subscribe((res) => {
      this.products = Object.values(res);
    })
  }

  openSnackBar() {
    this._snackBar.open('Added to Cart !', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['text-center'],
      duration: 1 * 1000,
    });
  }
}
