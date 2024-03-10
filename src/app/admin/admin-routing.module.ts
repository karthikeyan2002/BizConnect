import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BusinessprofileComponent } from './businessprofile/businessprofile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminloginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'userprofile/:id',
    component: UserprofileComponent
  },
  {
    path: 'businessprofile/:id',
    component: BusinessprofileComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
