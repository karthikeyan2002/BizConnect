import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: '', component: LoginRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
