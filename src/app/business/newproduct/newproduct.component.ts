import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  constructor(private _newproductRef: MatBottomSheetRef<NewproductComponent>) { }

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
     
    }
  }

}
