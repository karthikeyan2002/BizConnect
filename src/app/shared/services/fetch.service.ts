import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../interfaces/shop.interface';
import { Observable, Subject, filter, map, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { UserProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private searchValueSubject = new Subject<string>();
  searchValue$ = this.searchValueSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserId(): Observable<any> {
    const user = localStorage.getItem('user') || '';
    const parsedObject = JSON.parse(user);
    return this.http.get('https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users.json').pipe(
      map((users: any) => {
        const userKeys = Object.keys(users);
        const matchedUserKey = userKeys.find(key => users[key].uid === parsedObject.uid)
        return matchedUserKey;
      })
    )
  }

  fetchBusiness() {
    return this.http.get<Shop[]>('https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business.json');
  }

  fetchType(id: string): Observable<string> {
    return this.http.get<Shop>(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${id}.json`)
      .pipe(
        map((res) => {
          if (res.type) {
            return res.type;
          } else {
            throw new Error("No response");
          }
        })
      );
  }

  fetchShop(id: String): Observable<Shop> {
    return this.http.get<Shop>(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${id}.json`)
  }

  getCart(uid: string): Observable<{ [key: string]: Product }> {
    const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myCart.json`;
    return this.http.get<{ [key: string]: Product }>(url);
  }

  fetchCategories() {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`);
  }

  fetchShopFilterByCategory(category: string) {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business.json`);
  }

  getUserInfo(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`)
  }

  updateUser(id: string, updates: Partial<UserProfile>): Observable<any> {
    return this.http.patch(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`, updates);
  }
  fetchOrders(uid: string) {
    const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myOrders.json`;
    return this.http.get(url)
  }
  fetchOrder(id: string, uid: string) {
    const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myOrders/${id}.json`;
    return this.http.get(url)
  }

  fetchProducts(id: any) {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${id}/products.json`)
  }

  getWishlist(uid: any) {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myWishlist.json`)
  }

  removeWishlist(uid: any, id: any): void {
    this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myWishlist.json`).subscribe((res) => {
      const wishlistItems = Object.values(res);
      console.log(wishlistItems);

      const keyToRemove = Object.keys(res).filter((key: any) => wishlistItems[key] == id);
      console.log(keyToRemove);

      if (keyToRemove) {
        this.http.delete(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myWishlist/${keyToRemove}.json`).subscribe(() => {
          console.log('Wishlist item removed successfully.');
        }, error => {
          console.error('Error removing wishlist item:', error);
        });
      } else {
        console.log('Item not found in wishlist.');
      }
    })
  }

  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
  }

  fetchUsers() {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`);
  }

}
