import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { StorageService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  users: any;

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
        alert(error.message)
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
        alert(error.message);
      });
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
