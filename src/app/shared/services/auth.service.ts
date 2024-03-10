import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { StorageService } from './store.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  users: any;

  private loginErrorMessageSubject = new BehaviorSubject<string | null>(null);
  LoginerrorMessage$ = this.loginErrorMessageSubject.asObservable();

  private singUpErrorMessageSubject = new BehaviorSubject<string | null>(null);
  SignUpErrorMessage$ = this.singUpErrorMessageSubject.asObservable();

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private storage: StorageService
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.storage.appendUser(this.userData).subscribe(
          (response) => {
            // console.log("success");
            this.observeUserState();
          },
          (err) => {
            // console.log("error");

          }
        );
        // this.observeUserState()
      })
      .catch((error: Error) => {
        alert(error.message);
      })
  }


  loginWithEmailAndPassword(email: string, password: string) {
    this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState()
      })
      .catch((error) => {
        this.loginErrorMessageSubject.next("Invalid Credentials. Please try again !");
      })
  }

  signUpWithEmailAndPassword(email: string, password: string, firstName: string, lastName: string, city: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userData = userCredential.user;
        // Assuming you have a method to append user data to storage
        this.storage.appendUser({
          uid: userData?.uid,
          email: email,
          firstName: firstName,
          lastName: lastName,
          city: city
        }).subscribe(
          (response) => {
            this.observeUserState();
          },
          (err) => { }
        );
      })
      .catch((error: Error) => {
        this.singUpErrorMessageSubject.next('Email is already registerd with us. Please try login !');
      });
  }

  adminLogin(userName: string, password: string) {
    this.firebaseAuthenticationService.signInWithEmailAndPassword(userName, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState()
      })
      .catch((error) => {
        this.loginErrorMessageSubject.next("Invalid Credentials. Please try again !");
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login-register']);
    })
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['']));
    })
  }
}
