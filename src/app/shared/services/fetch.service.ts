import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../interfaces/shop.interface';
import { Observable, Subject, filter, map, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { UserProfile } from '@angular/fire/auth';
import { baseUrl } from 'src/environments/environment.development';

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
    return this.http.get(`${baseUrl}users.json`).pipe(
      map((users: any) => {
        const userKeys = Object.keys(users);
        const matchedUserKey = userKeys.find(key => users[key].uid === parsedObject.uid)
        return matchedUserKey;
      })
    )
  }

  fetchBusiness() {
    return this.http.get<Shop[]>(`${baseUrl}business.json`);
  }

  fetchType(id: string): Observable<string> {
    return this.http.get<Shop>(`${baseUrl}business/${id}.json`)
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
    return this.http.get<Shop>(`${baseUrl}business/${id}.json`)
  }

  getCart(uid: string): Observable<{ [key: string]: Product }> {
    const url = `${baseUrl}users/${uid}/myCart.json`;
    return this.http.get<{ [key: string]: Product }>(url);
  }

  fetchCategories() {
    return this.http.get(`${baseUrl}categories.json`);
  }

  fetchShopFilterByCategory(category: string) {
    return this.http.get(`${baseUrl}business.json`);
  }

  getUserInfo(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${baseUrl}users/${id}.json`)
  }

  updateUser(id: string, updates: Partial<UserProfile>): Observable<any> {
    return this.http.patch(`${baseUrl}users/${id}.json`, updates);
  }
  fetchOrders(uid: string) {
    const url = `${baseUrl}users/${uid}/myOrders.json`;
    return this.http.get(url)
  }
  fetchOrder(id: string, uid: string) {
    const url = `${baseUrl}users/${uid}/myOrders/${id}.json`;
    return this.http.get(url)
  }

  fetchProducts(id: any) {
    return this.http.get(`${baseUrl}business/${id}/products.json`)
  }

  getWishlist(uid: any) {
    return this.http.get(`${baseUrl}users/${uid}/myWishlist.json`)
  }

  removeWishlist(uid: any, id: any): void {
    this.http.get(`${baseUrl}users/${uid}/myWishlist.json`).subscribe((res) => {
      const wishlistItems = Object.values(res);
      const keyToRemove = Object.keys(res).filter((key: any) => wishlistItems[key] == id);
      if (keyToRemove) {
        this.http.delete(`${baseUrl}users/${uid}/myWishlist/${keyToRemove}.json`).subscribe(() => {
        }, error => {
          console.warn('Error removing wishlist item:', error);
        });
      } else {
        console.warn('Item not found in wishlist.');
      }
    })
  }

  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
  }

  fetchUsers() {
    return this.http.get(`${baseUrl}users.json`);
  }

}
