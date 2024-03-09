import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { UserProfile } from 'src/app/shared/interfaces/userProfile.interface';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {
firstName: any;
register() {
throw new Error('Method not implemented.');
}
  uid!: any;
  user!: any;
  constructor(private fet: FetchService) {
    this.uid = this.fet.getUserId().subscribe((res) => {
      this.uid = res;
      this.fet.getUserInfo(res).subscribe((user) => {
        this.user = user;
      }
      )
    });
  }
}
