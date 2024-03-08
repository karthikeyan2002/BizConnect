import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {
  errorMessage: string | null = null;
  private errorMessageSubscription: Subscription | undefined;


  constructor(private route: Router, private auth: AuthService) {
    this.errorMessageSubscription = this.auth.LoginerrorMessage$.subscribe(
      errorMessage => this.errorMessage = errorMessage
    );
  }

  @Output() goToRegister = new EventEmitter<void>();

  moveToRegister(event: Event) {
    event.preventDefault();
    this.goToRegister.emit();
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])
  hide = true;
  matcher = new MyErrorStateMatcher();

  navigateToHome() {
    this.route.navigate([''])
  }

  loginWithEmailAndPassword(event: Event) {
    event.preventDefault();
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;
      this.auth.loginWithEmailAndPassword(email!, password!);
    }
  }

  loginWithGoogle(event: Event) {
    event.preventDefault();
    this.auth.logInWithGoogleProvider();
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription?.unsubscribe();
  }
}

