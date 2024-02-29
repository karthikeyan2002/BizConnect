import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http:HttpClient) {}

  fetchBusiness(){
    return this.http.get<Shop[]>('https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business.json');
  }
}
