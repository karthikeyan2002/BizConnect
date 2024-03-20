import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})

export class MycartComponent {

  uid: any;
  myCart: Product[] = [];
  isCartEmpty: boolean = true;
  myColor: string = '#673AB7';
  total: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fet: FetchService, private storage: StorageService, private route: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fet.getUserId().subscribe((userId) => {
      this.uid = userId;
      (this.uid)
      this.getCart(this.uid)
      this.getTotal();
    })

  }

  increase(item: Product) {
    this.storage.addToCart(item, this.uid).subscribe((res) => {
      this.getTotal();
     })

  }

  decrease(item:Product){
    this.storage.removeFromCart(item, this.uid).subscribe((res) => {
      this.getTotal();
    })
  }

  getCart(id: string) {
    this.fet.getCart(id).subscribe((cartData: { [key: string]: Product }) => {
      if (cartData) {
        this.isCartEmpty = false;
        for (const productId in cartData) {
          if (cartData.hasOwnProperty(productId)) {
            const product = cartData[productId];
            this.myCart?.push(product);
          }
        }
        this.getTotal();
      } else {
        this.isCartEmpty = true;
      }

    });
  }

  navigate() {
    this.route.navigate(['myorders']);
  }

  openSnackBar() {
    this._snackBar.open('Your Cart is now empty. Start Fresh !', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['text-center'],
      duration: 1 * 1000,
    });
  }

  placeOrder() {
    this.storage.placeOrder(this.myCart, this.uid,this.total).subscribe(
      {
        next: res => {
          if (res) {
            (res);
            this.storage.EmptyCart([], this.uid).subscribe(
              (emptyCartRes) => {
                if (emptyCartRes) {
                  this.openSnackBar();
                } else {
                  ('Error emptying cart.');
                }
              },
              (emptyCartError) => {
                console.error('Error emptying cart:', emptyCartError);
              }
            );
          }
        },
        error: placeOrderError => {
          console.error('Error placing order:', placeOrderError);
        }
      }

    );
    this.navigate();
  }

  getTotal() {
    let total = 0;
    for (const item of this.myCart) {
      total += item.price * item.quantity;
    }
    this.total = total;
  }


  navigateToHome() {
    this.route.navigate(['']);
  }

  emptyCart(){
    this.storage.EmptyCart([], this.uid).subscribe(
      (emptyCartRes) => {
        this.openSnackBar();
        window.location.reload();
        if (emptyCartRes) {
          this.openSnackBar();
        } else {
        }
      },
      (emptyCartError) => {
        console.error('Error emptying cart:', emptyCartError);
      }
    );
  }
}
