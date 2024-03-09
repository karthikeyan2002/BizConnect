import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesshomeComponent } from './businesshome/businesshome.component';
import { MybusinessComponent } from './mybusiness/mybusiness.component';
import { BusinessshopComponent } from './businessshop/businessshop.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BusinesshomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'mybusiness',
    component: MybusinessComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'businessshop/:id',
    component:BusinessshopComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
