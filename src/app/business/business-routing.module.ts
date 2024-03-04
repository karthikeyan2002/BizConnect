import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesshomeComponent } from './businesshome/businesshome.component';


const routes: Routes = [
 {
    path:'business',
    component:BusinesshomeComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
