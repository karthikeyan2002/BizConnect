import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private auth: AuthService) { }

  showFiller = false;
  isSearchOpen: boolean = false;
  
  logout() {
    this.auth.logOut();
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

}
