import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FetchService } from 'src/app/shared/services/fetch.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  firstName: string = '';
  lastName: string = '';
  city: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  id!:string;

  constructor(private route: Router,private fet:FetchService) {
      fet.getUserId().subscribe((res)=>{
        this.id = res;
      })
   }

  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])
  matcher = new MyErrorStateMatcher();
  cityControl = new FormControl('', [Validators.required]);
  // Define a new FormControl for confirmPassword
  confirmPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    // Custom validator to match the password
    this.matchConfirmPassword.bind(this)
  ]);

  // Custom validator function to match password and confirmPassword
  matchConfirmPassword(control: FormControl) {
    const password = this.passwordFormControl.value;
    const confirmPassword = control.value;

    // Check if password and confirmPassword match
    if (password === confirmPassword) {
      return null; // Return null if they match
    } else {
      return { mismatch: true }; // Return an error object if they don't match
    }
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

  update(){
    console.log("working");
    
    this.fet.updateUser(this.id, { firstName: this.firstName, lastName: this.lastName,city:this.city}).subscribe(response => {
      console.log('User data updated successfully', response);
    }, error => {
      console.error('Failed to update user data', error);
    });
  }

}
