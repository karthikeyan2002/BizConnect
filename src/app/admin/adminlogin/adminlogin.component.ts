import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router:Router) {}

  onSubmit() {
     if (this.username === 'admin' && this.password === 'password') {
    
      this.router.navigate(['/admin/dashboard']);
    } else {

      alert("INVALID CREDENTIALS")
    }
  }
}
