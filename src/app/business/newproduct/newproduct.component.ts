import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { BusinessService } from 'src/app/shared/services/business.service';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  shopid!: string;


  constructor(private _newproductRef: MatBottomSheetRef<NewproductComponent>, private bus: BusinessService, private route: ActivatedRoute, private fet: FetchService) {
    this.shopid = this.bus.getBusinessId();
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
        isAvailable: formData.isAvailable || false,
        isInCart: false
      };
      this.bus.addProduct(this.shopid, productData).subscribe(() => {
      },);

    }
  }


}
