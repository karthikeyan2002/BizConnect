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
  myColor: string = '#673AB7';
  total: number = 0;

  constructor(private fet: FetchService, private storage: StorageService, private route: Router) { }

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
      (res);
    })

  }

  decrease(item:Product){
    this.storage.removeFromCart(item, this.uid).subscribe((res) => {
      this.getTotal();
      (res);
    })
  }

  getCart(id: string) {
    this.fet.getCart(id).subscribe((cartData: { [key: string]: Product }) => {
      if (cartData) {
        ("working");
        this.isCartEmpty = false;
        for (const productId in cartData) {
          if (cartData.hasOwnProperty(productId)) {
            const product = cartData[productId];
            (typeof (product));
            this.myCart?.push(product)
            (this.myCart);
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

  placeOrder() {
    this.storage.placeOrder(this.myCart, this.uid,this.total).subscribe(
      {
        next: res => {
          if (res) {
            (res);
            this.storage.EmptyCart([], this.uid).subscribe(
              (emptyCartRes) => {
                if (emptyCartRes) {
                  (emptyCartRes);
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
        if (emptyCartRes) {
          (emptyCartRes);
        } else {
          ('Error emptying cart.');
        }
      },
      (emptyCartError) => {
        console.error('Error emptying cart:', emptyCartError);
      }
    );
  }
}
