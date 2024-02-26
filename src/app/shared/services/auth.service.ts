import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
      this.firebaseAuthenticationService.authState.subscribe((user)=>{
        if(user){
          this.userData = user;
          localStorage.setItem('user',JSON.stringify(this.userData));
        }else{
          localStorage.setItem('user','null');
        }
      })
   }

   logInWithGoogleProvider(){
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
            .then(()=> this.observeUserState())
            .catch((error:Error)=>{
              alert(error.message);
            })
   }

   observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe((userState)=>{
      userState && this.ngZone.run(()=>this.router.navigate(['home']));
    })
   }
}
