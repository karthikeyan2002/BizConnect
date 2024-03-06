import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/business.service';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/shared/services/fetch.service';


@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.component.html',
  styleUrls: ['./businessprofile.component.css']
})
export class BusinessprofileComponent implements OnInit {

  constructor(private bus: BusinessService,private route:Router,private fet:FetchService) { }

  shopName!: string;
  shopDescription!: string;
  addressLane1!: string;
  addressLane2!: string;
  city!: string;
  category!: string;
  subCategory!: string;
  type!: string;

  formData: Shop = {
    src: undefined,
    id: 0,
    name: '',
    description: '',
    addressLane1: '',
    addressLane2: '',
    city: '',
    rating: 0,
    type: 'product',
    avgPricing: '',
    category: '',
    subcategory: '',
    products: [],
    admin:'',
  };
  
  selectedFile: File | null = null;
  cityControl = new FormControl('', [Validators.required]);


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  options: string[] = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ]
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addShop() {
    this.fet.getUserId().subscribe((res)=>{
      this.formData.admin = res;
      this.bus.addShop(this.formData).subscribe((res) => {
        console.log("FORM SUBMISSION DONE SUCEESSFULLy");
        this.route.navigate(['/business/mybusiness']);
       
      }, err => {
        console.log("SUBMISSION ERROR");
      })
    })
    
  }


}
