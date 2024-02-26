import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent {

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

}


