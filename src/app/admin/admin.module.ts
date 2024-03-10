import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AdminnavComponent } from './adminnav/adminnav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BusinessprofileComponent } from './businessprofile/businessprofile.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminnavComponent,
    UserprofileComponent,
    BusinessprofileComponent,
    AdminloginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class AdminModule { }
