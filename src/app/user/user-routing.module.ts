import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MycartComponent } from './mycart/mycart.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'login-register',
    component: LoginRegisterComponent
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop/:id',
    component: ShopComponent
  },
  // {
  //   path: '',
  //   component: LoginRegisterComponent
  // },
  {
    path: 'cart',
    component: MycartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookings',
    component: MybookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myorders',
    component: MyordersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
