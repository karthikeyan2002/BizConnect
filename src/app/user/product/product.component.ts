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
  isCartEmpty: boolean = true;
  myCart: Product[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private route: ActivatedRoute, private fet: FetchService, private storage: StorageService, private _snackBar: MatSnackBar) {
    this.fet.getUserId().subscribe((data) => {
      this.uid = data;
      this.getCart(this.uid);
      this.fetchProducts();
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
        window.location.reload();
      },
      (err) => {
        alert("problem here")
        this.Message = "Item missing :("
      }
    );

  }

  fetchProducts() {
    this.fet.fetchProducts(this.id).subscribe((res) => {
      this.products = Object.values(res);
      console.log(this.products);
        this.products.forEach(product => {
        const isInCart = this.myCart.some(cartItem => cartItem.productId === product.productId);
        product.isInCart = isInCart;
        const cartProduct = this.myCart.find(cartItem => cartItem.productId === product.productId);
        if (cartProduct) {
          product.quantity = cartProduct.quantity;
        }
      });
    });
  }
  

  increase(item: Product) {
    this.storage.addToCart(item, this.uid).subscribe((res) => {
    })

  }

  decrease(item: Product) {
    this.storage.removeFromCart(item, this.uid).subscribe((res) => {
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

  getCart(id: string) {
    console.log("working here");

    this.fet.getCart(id).subscribe((cartData: { [key: string]: Product }) => {
      if (cartData) {
        this.isCartEmpty = false;
        for (const productId in cartData) {
          if (cartData.hasOwnProperty(productId)) {
            const product = cartData[productId];
            this.myCart?.push(product);
          }
        }
      } else {
        this.isCartEmpty = true;
      }

    });
  }
}
