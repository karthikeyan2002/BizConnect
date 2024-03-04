import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
// import { user } from "rxfire/auth";
// import { DatePipe } from '@angular/common';
import { user } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    // private datePipe: DatePipe
    constructor(private http: HttpClient) { }

    // currentTime:any = new Date();
    // formattedTime:any = this.datePipe.transform(this.currentTime, 'medium');

    appendUser(userData: any): Observable<any> {
        const userId = userData.uid;
        const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`;
        userData.mycat = [];
        userData.myorders = [];
        userData.mybookings = [];
        return this.http.patch<any>(url, userData);

    }

    // addToCart(items: any, uid: any): Observable<any> {
    //     const url1 = 'https://fillmycart-f1f01-default-rtdb.asia-southeast1.firebasedatabase.app/users/' + uid + '/myCart/' + items.id + '.json';

    //     return this.http.get(url1).pipe(
    //         switchMap((val: any) => {
    //             if (val) {
    //                 console.log(val);
    //                 if ('quantity' in val) {
    //                     items.quantity += 1;
    //                 } else {
    //                     console.log("Quantity not found in response.");
    //                 }
    //             } else {
    //                 console.log("DATA NOT FOUND");
    //             }

    //             return this.http.patch(url1, items);
    //         })
    //     );
    // }

    // placeOrder(items:any,uid:any){
    //     const myOrders = {
    //         ...items,
    //         status:"Order Placed",
    //         completed:false,
    //         time:this.formattedTime,
    //     }
    //     const url = 'https://fillmycart-f1f01-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+uid+'/myOrders.json';
    //     return this.http.post(url,myOrders)
    // }

    // EmptyCart(items:any,uid:any){
    //     const url1 = 'https://fillmycart-f1f01-default-rtdb.asia-southeast1.firebasedatabase.app/users/' + uid + '/myCart.json';
    //     return this.http.delete(url1)
    // }

}

