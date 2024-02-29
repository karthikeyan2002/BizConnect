import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Shop } from '../../shared/interfaces/shop.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

  Business:Shop[] | undefined;
  constructor(private fet:FetchService) {
    this.fetchBusiness();
  }


  category: string | undefined;
  categoriesWithSubcategories = [
    {
      category: "Tutoring",
      subcategories: ["1-5", "6-8", "10+"],
    },
    {
      category: "Language tutoring",
      subcategories: ["Spoken English", "Hindi", "Tamil"],
    },
    {
      category: "Music lessons",
      subcategories: ["Piano", "Guitar", "Violin"],
    },
    {
      category: "Personal training",
      subcategories: ["Cardio", "Strength training", "Yoga/Pilates"],
    },
    {
      category: "Fitness coaching",
      subcategories: ["Beginner", "Intermediate", "Professional"],
    },
    {
      category: "Home cleaning",
      subcategories: ["Regular", "Deep cleaning", "Move-in/move-out"],
    },
    {
      category: "Gardening",
      subcategories: ["Lawn maintenance", "Landscaping", "Garden design"],
    },
    {
      category: "Home organization",
      subcategories: ["Closet organization", "Kitchen organization", "Decluttering"],
    },
    {
      category: "Makeup artistry",
      subcategories: ["Everyday makeup", "Special occasion makeup", "Theatrical makeup"],
    },
    {
      category: "Computer Programming",
      subcategories: ["Web Development", "Mobile App Development", "Data Science"],
    },
    {
      category: "Photography",
      subcategories: ["Portrait Photography", "Landscape Photography", "Event Photography"],
    },
    {
      category: "Cooking Classes",
      subcategories: ["Italian Cuisine", "Asian Cuisine", "Baking"],
    },
    {
      category: "Dance Instruction",
      subcategories: ["Ballet", "Hip Hop", "Salsa"],
    },
    {
      category: "Language Translation",
      subcategories: ["Spanish", "French", "Chinese"],
    }
  ];
  subCategories: string[] = [];

  chipSelected(category: string) {
    this.category = category;
    const selectedCategory = this.categoriesWithSubcategories.find(cat => cat.category === this.category);

    if (selectedCategory) {
      this.subCategories = selectedCategory.subcategories;
      console.log(this.subCategories);
    } else {
      this.subCategories = [];
      console.error("Category not found:", this.category);
    }
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

  fetchBusiness(){
    this.fet.fetchBusiness().subscribe((res)=>{
      if(res){
          this.Business = res;
      }else{
        console.warn("few problems");
        
      }
    })
  }
    
  
}


