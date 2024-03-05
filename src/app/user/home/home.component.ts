import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { UserProfile } from 'src/app/shared/interfaces/userProfile.interface';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  id!: string;
  firstName!: string;
  city!:string;

  constructor(private fet: FetchService) {
    this.fet.getUserId().subscribe((res: string) => {
      this.id = res;
      this.fet.getUserInfo(this.id).subscribe((result: any) => {
        if (result) {
          this.firstName = result.firstName;
        } else {
          console.warn("mistake here");
        }
      })
    });

  }

  isGuest(){
    return localStorage.getItem('user') === 'null';
  }

}
