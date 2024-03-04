import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../interfaces/shop.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

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

  fetchShop(id: String) {
    return this.http.get<Shop>(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${id}.json`)
  }

}