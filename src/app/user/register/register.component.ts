import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  city: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private route: Router, private auth: AuthService) { }

  @Output() goToLogin = new EventEmitter<void>();

  moveToLogin(event: Event) {
    event.preventDefault();
    this.goToLogin.emit();
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

  navigateToLogin() {
    this.route.navigate(['login']);
  }

  register() {
    this.auth.signUpWithEmailAndPassword(this.email, this.password);
  }

}
