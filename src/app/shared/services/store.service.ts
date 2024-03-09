import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { user } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private datePipe!: DatePipe;
    constructor(private http: HttpClient) { }

    currentTime:any = new Date();
    formattedTime:any = this.datePipe?.transform(this.currentTime, 'medium');

    appendUser(userData: any): Observable<any> {
        const userId = userData.uid;
        const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`;
        userData.mycat = [];
        userData.myorders = [];
        userData.mybookings = [];
        return this.http.patch<any>(url, userData);

    }

    addToCart(items: any, uid: any): Observable<any> {
        const url1 = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myCart/${items.productid}.json`;

        return this.http.get(url1).pipe(
            switchMap((val: any) => {
                if (val) {
                    console.log(val);
                    if ('quantity' in val) {
                        items.quantity += 1;
                    } else {
                        console.log("Quantity not found in response.");
                    }
                } else {
                    console.log("DATA NOT FOUND");
                }

                return this.http.patch(url1, items);
            })
        );
    }

    placeOrder(items:any,uid:any){
        const myOrders = {
            ...items,
            status:"Order Placed",
            completed:false,
            time:this.formattedTime,
        }
        const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myOrders.json`;
        return this.http.post(url,myOrders)
    }

    EmptyCart(items:any,uid:any){   
        const url1 = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myCart.json`;
        console.log(url1);
        return this.http.delete(url1)
    }

    updateShop(id:string,shop:any){
        return this.http.patch(`https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/business/${id}.json`,shop)
    }

    addToWishlist(uid:any,shopId:any){
        const url = `https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/myWishlist.json`;
        this.http.get(url).subscribe((res)=>{
            const shops = Object.values(res);
            if(shopId in shops){
                alert("Already added");
            }else{
                this.http.post(url,shopId).subscribe((res)=>{
                    console.log("Done");
                    
                })
            }
        })
    }
}

