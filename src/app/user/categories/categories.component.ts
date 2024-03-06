import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Shop } from '../../shared/interfaces/shop.interface';
import { Router } from '@angular/router';
import { Categories } from 'src/app/shared/interfaces/categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

  Business: Shop[] | undefined;
  categoriesWithSubcategories: any;
  myColor: string = '#ababab';

  constructor(private fet: FetchService, private route: Router) {
    this.fetchBusiness();
    this.fet.fetchCategories().subscribe((res) => {
      this.categoriesWithSubcategories = res;
    })
  }


  category: string | undefined;

  subCategories: string[] = [];
  card: any;

  chipSelected(category: string) {
    this.category = category;
    const selectedCategory = this.categoriesWithSubcategories.find((cat: Categories) => cat.category === this.category);

    if (selectedCategory) {
      this.subCategories = selectedCategory.subcategories;
      console.log(this.subCategories);
    } else {
      this.subCategories = [];
      console.error("Category not found:", this.category);
    }
    this.fet.fetchBusiness().subscribe((res) => {
      this.Business = res.filter((cards) => cards.category === category)
    })
  }

  clearFilter(){
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

}


