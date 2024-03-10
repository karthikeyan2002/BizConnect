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
  canLogin:boolean = false;

  constructor(private router:Router,private auth:AuthService) {}

  onSubmit() {
     if (this.username === 'admin' && this.password === 'password') {
      this.auth.setValue(true)
      this.router.navigate(['/admin/dashboard/']);
    } else {

      alert("INVALID CREDENTIALS")
    }
  }
}
