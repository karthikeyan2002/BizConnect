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

  constructor(private fet: FetchService, private route: Router) {
    this.fetchBusiness();
    this.fet.fetchCategories().subscribe((res) => {
      this.categoriesWithSubcategories = res;
    })
  }


  category: string | undefined;

  // categoriesWithSubcategories = [
  //   {
  //     category: "Tutoring",
  //     subcategories: ["1-5", "6-8", "10+"],
  //   },
  //   {
  //     category: "Language tutoring",
  //     subcategories: ["Spoken English", "Hindi", "Tamil"],
  //   },
  //   {
  //     category: "Music lessons",
  //     subcategories: ["Piano", "Guitar", "Violin"],
  //   },
  //   {
  //     category: "Personal training",
  //     subcategories: ["Cardio", "Strength training", "Yoga/Pilates"],
  //   },
  //   {
  //     category: "Fitness coaching",
  //     subcategories: ["Beginner", "Intermediate", "Professional"],
  //   },
  //   {
  //     category: "Home cleaning",
  //     subcategories: ["Regular", "Deep cleaning", "Move-in/move-out"],
  //   },
  //   {
  //     category: "Gardening",
  //     subcategories: ["Lawn maintenance", "Landscaping", "Garden design"],
  //   },
  //   {
  //     category: "Home organization",
  //     subcategories: ["Closet organization", "Kitchen organization", "Decluttering"],
  //   },
  //   {
  //     category: "Makeup artistry",
  //     subcategories: ["Everyday makeup", "Special occasion makeup", "Theatrical makeup"],
  //   },
  //   {
  //     category: "Computer Programming",
  //     subcategories: ["Web Development", "Mobile App Development", "Data Science"],
  //   },
  //   {
  //     category: "Photography",
  //     subcategories: ["Portrait Photography", "Landscape Photography", "Event Photography"],
  //   },
  //   {
  //     category: "Cooking Classes",
  //     subcategories: ["Italian Cuisine", "Asian Cuisine", "Baking"],
  //   },
  //   {
  //     category: "Dance Instruction",
  //     subcategories: ["Ballet", "Hip Hop", "Salsa"],
  //   },
  //   {
  //     category: "Language Translation",
  //     subcategories: ["Spanish", "French", "Chinese"],
  //   }
  // ];

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


