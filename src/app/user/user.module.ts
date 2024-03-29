import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserRoutingModule } from './user-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AboutComponent } from './about/about.component';
import { TabComponent } from './tab/tab.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { CategoriesComponent } from './categories/categories.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { MatExpansionModule, matExpansionAnimations } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MycartComponent } from './mycart/mycart.component';
import { ProfileComponent } from './profile/profile.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderComponent } from './order/order.component';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    TabComponent,
    LoginRegisterComponent,
    CategoriesComponent,
    ShopComponent,
    ProductComponent,
    ServiceComponent,
    MycartComponent,
    ProfileComponent,
    MybookingsComponent,
    MyprofileComponent,
    MyordersComponent,
    OrderComponent,
    MywishlistComponent,
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    UserRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    FormsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRippleModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
})
export class UserModule { }
