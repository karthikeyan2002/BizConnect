import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MycartComponent } from './mycart/mycart.component';


const routes: Routes = [
  {
    path: 'login-register',
    component: LoginRegisterComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop/:id',
    component: ShopComponent
  },
  {
    path: '',
    component: LoginRegisterComponent
  },
  {
    path:'cart',
    component:MycartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
