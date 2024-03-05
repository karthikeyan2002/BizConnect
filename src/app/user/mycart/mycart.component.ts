import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { StorageService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})

export class MycartComponent {

  uid: any;
  myCart: Product[] = [];
  isCartEmpty: boolean = true;

  constructor(private fet: FetchService, private storage: StorageService, private route: Router) { }

  ngOnInit(): void {
    this.fet.getUserId().subscribe((userId) => {
      this.uid = userId;
      console.log(this.uid)
      this.getCart(this.uid)
    })

  }

  increase(item: Product) {
    this.storage.addToCart(item, this.uid).subscribe((res) => {
      console.log(res);
    })

  }

  getCart(id: string) {
    this.fet.getCart(id).subscribe((cartData: { [key: string]: Product }) => {


      if (cartData) {
        console.log("working");
        this.isCartEmpty = false;
        for (const productId in cartData) {
          if (cartData.hasOwnProperty(productId)) {
            const product = cartData[productId];
            console.log(typeof (product));
            this.myCart?.push(product)
            console.log(this.myCart);
          }
        }
      } else {
        this.isCartEmpty = true;
      }

    });
  }

  navigate() {
    this.route.navigate(['myorders']);
  }

  placeOrder() {
    this.storage.placeOrder(this.myCart, this.uid).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.storage.EmptyCart([], this.uid).subscribe(
            (emptyCartRes) => {
              if (emptyCartRes) {
                console.log(emptyCartRes);
              } else {
                console.log('Error emptying cart.');
              }
            },
            (emptyCartError) => {
              console.error('Error emptying cart:', emptyCartError);
            }
          );
        }
      },
      (placeOrderError) => {
        console.error('Error placing order:', placeOrderError);
      }
    );
    this.navigate();
  }


  navigateToHome() {
    this.route.navigate(['home']);
  }

}
