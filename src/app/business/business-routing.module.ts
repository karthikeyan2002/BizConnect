import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesshomeComponent } from './businesshome/businesshome.component';
import { MybusinessComponent } from './mybusiness/mybusiness.component';
import { BusinessshopComponent } from './businessshop/businessshop.component';

const routes: Routes = [
  {
    path: '',
    component: BusinesshomeComponent
  },
  {
    path: 'mybusiness',
    component: MybusinessComponent
  },
  {
    path:'businessshop/:id',
    component:BusinessshopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
