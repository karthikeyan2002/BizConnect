import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Shop } from '../../shared/interfaces/shop.interface';
import { Router } from '@angular/router';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { StorageService } from 'src/app/shared/services/store.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

  uid:any;
  Business: Shop[] | undefined;
  categoriesWithSubcategories: any;
  myColor: string = '#ababab';
  category: string | undefined;
  subCategory!: string;
  subCategories: string[] = [];
  card: any;
  searchValue: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fet: FetchService, private route: Router,private store:StorageService,private _snackBar: MatSnackBar) {
    this.fetchBusiness();
    this.fet.fetchCategories().subscribe((res) => {
      this.categoriesWithSubcategories = res;
    })
    this.fet.getUserId().subscribe((res)=>{
      this.uid = res;
    })
    this.fet.searchValue$.subscribe(value => {
      this.searchValue = value;
      this.categoryFilter(this.searchValue)
    });
  }

  openSnackBar() {
    this._snackBar.open('Added to Wishlist !', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass:['text-center'],
      duration:2*1000,
    });
  }

  categoryFilter(category: string) {
    this.category = category;
    const selectedCategory = this.categoriesWithSubcategories.find((cat: Categories) => cat.category === this.category);

    if (selectedCategory) {
      this.subCategories = selectedCategory.subcategories;
      (this.subCategories);
    } else {
      this.subCategories = [];
      console.error("Category not found:", this.category);
    }
    this.fet.fetchBusiness().subscribe((res) => {
      this.Business = res.filter((cards) => cards.category === category)
    })
  }

  subCategoryFilter(subcategory: string) {
    this.subCategory = subcategory;
    const selectedCategory = this.categoriesWithSubcategories.find((cat: Categories) => cat.subcategories.includes(this.subCategory));
    this.fet.fetchBusiness().subscribe((res) => {
      this.Business = res.filter((cards) => (cards.subcategory === subcategory) && (cards.category === this.category))
    })
  }

  clearFilter() {
    window.location.reload();
  }


  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (halfStar) {
      stars.push('star_half');
    }

    return stars;
  }

  fetchBusiness() {
    this.fet.fetchBusiness().subscribe((res) => {
      if (res) {
        this.Business = res;
      } else {
        console.warn("few problems");

      }
    })
  }

  navigateToShop(id: any) {
    this.route.navigate([`shop/${id}`])
  }

  addToWishlist(shopId: any) {
    this.store.addToWishlist(this.uid,shopId);
    this.openSnackBar();
  }

}


