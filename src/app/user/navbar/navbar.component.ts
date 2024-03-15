import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  private searchInput: Subject<string> = new Subject<string>();

  constructor(private auth: AuthService,private fet:FetchService) { 
    this.searchInput.pipe(debounceTime(2000)).subscribe(value => {
      
    });
  }

  showFiller = false;
  isSearchOpen: boolean = false;

  logout() {
    this.auth.logOut();
  }

  isLogin() {
    return this.auth.isLoggedIn;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  handleInput(event: any) {
    const searchValue = event.target.value;
    this.fet.setSearchValue(searchValue);
  }
}
