import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { UserProfile } from 'src/app/shared/interfaces/userProfile.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  id!: string;
  city!: string;

  constructor(private fet: FetchService) {
    this.fet.getUserId().subscribe((res:string) => {
      this.id = res;
      this.fet.getUserInfo(this.id).subscribe((result:any) => {
        if (result) {
          this.city = result.city;
        } else {
          console.warn("mistake here");
        }
      })
    });
  }

}
