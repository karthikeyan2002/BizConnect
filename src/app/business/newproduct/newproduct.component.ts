import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  shopid!:string;

  constructor(private _newproductRef: MatBottomSheetRef<NewproductComponent>,private bus:BusinessService,private route:ActivatedRoute) {
    this.shopid = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.shopid);
    console.log();
    
    
   }

  openLink(event: MouseEvent): void {
    this._newproductRef.dismiss();
    event.preventDefault();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      const productData: Product = {
        name: formData.name,
        price: formData.price,
        productId: formData.productId,
        quantity: formData.quantity,
        rating: formData.rating,
        isAvailable: formData.isAvailable || false 
      };
      console.log(productData);
      this.bus.addProduct(this.shopid,productData).subscribe(()=>{
        console.log("Product updated !");
      },);
     
    }
  }

}
