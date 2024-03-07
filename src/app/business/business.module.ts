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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MybusinessComponent } from './mybusiness/mybusiness.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BusinessshopComponent } from './businessshop/businessshop.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BusinessproductComponent } from './businessproduct/businessproduct.component';
import { BusinessserviceComponent } from './businessservice/businessservice.component';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NewproductComponent } from './newproduct/newproduct.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    BusinesshomeComponent,
    BusinessnavComponent,
    BusinessprofileComponent,
    MybusinessComponent,
    BusinessshopComponent,
    BusinessproductComponent,
    BusinessserviceComponent,
    NewproductComponent,
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
    MatDividerModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTableModule
  ]
})
export class BusinessModule { }
