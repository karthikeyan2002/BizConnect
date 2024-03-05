import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinesshomeComponent } from './businesshome/businesshome.component';
import { UserRoutingModule } from './business-routing.module';
import { BusinessnavComponent } from './businessnav/businessnav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BusinessprofileComponent } from './businessprofile/businessprofile.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [
    BusinesshomeComponent,
    BusinessnavComponent,
    BusinessprofileComponent

  ],
  imports: [
    CommonModule,
    RouterModule, 
    UserRoutingModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class BusinessModule { }
