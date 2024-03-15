import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { UserProfile } from 'src/app/shared/interfaces/userProfile.interface';
import { user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  id!: string;
  email!: string;
  city!: string;
  userName: String = 'Guest';

  constructor(private fet: FetchService, public dialog: MatDialog) {
    if (localStorage.getItem('user')) {
      this.fet.getUserId().subscribe((res: string) => {
        this.id = res;
        this.fet.getUserInfo(this.id).subscribe((result: any) => {
          if (result) {
            this.userName = result.firstName;
          } else {
            console.warn("mistake here");
          }
        })
      });
    } else {
      ("nothing here");

    }
  }


  isGuest() {
    return localStorage.getItem('user') === 'null';
  }

}
