import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, switchMap } from 'rxjs';
import { Shop } from '../interfaces/shop.interface';
import { FetchService } from './fetch.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  uid!: any;
  shopid!: any;

  constructor(private http: HttpClient, private fet: FetchService) { }
  setBusinessId(id: any) {
    this.shopid = id;
  }
  getBusinessId() {
    return this.shopid;
  }

  getId(): Observable<number> {
    return this.http.get<any[]>('https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business.json')
      .pipe(
        map(data => {
          const length = Object.keys(data).length;
          const newId = length;
          return newId;
        })
      );
  }

  addShop(formData: any) {
    let uid: any;
    return this.getId().pipe(
      switchMap(newId => {
        formData.id = newId;
        this.fet.getUserId().subscribe((res) => {
          uid = res;
          formData.admin = res;
          this.addtoProfile(newId, uid).subscribe(() => {
          }, err => {
            console.warn('Problems in adding profile');

          })
        });

        return this.http.patch(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${newId}.json`, formData);
      })
    );
  }

  addtoProfile(businessid: any, uid: any) {
    const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myBusiness.json`;
    return this.http.post(url, businessid)
  }

  getMyBusiness(uid: any) {
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myBusiness.json`)
  }

  fetchMyShop(key: number) {
    return this.http.get<Shop>(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${key}.json`)
  }

  addProduct(shopid: any, product: Product) {
    return this.http.patch(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/products/${product.productId}.json`, product)
  }

  updateProduct(shopid:any,product:Product){
     return this.http.put(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/products/${product.productId}.json`, product)
  }

  updateTypeOfService(shopid:any,service:Array<string>){
    return this.http.put(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/typeOfService.json/`, service)
  }

  getTypeOfService(shopid:any){
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/typeOfService.json/`)
  }

  bookEventSlot(shopid:any,type:any,date:any){
    return this.http.post(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/mybookings/${type}.json`,date)
  }

  getMyBookings(shopid:any){
    return this.http.get(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${shopid}/mybookings/event.json`)
  }
}
