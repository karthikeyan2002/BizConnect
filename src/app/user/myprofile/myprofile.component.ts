import { Component } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { UserProfile } from 'src/app/shared/interfaces/userProfile.interface';
import { StorageService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {
  firstName: any;
  uid!: any;
  user!: any;

  constructor(private fet: FetchService,private store:StorageService) {
    this.uid = this.fet.getUserId().subscribe((res) => {
      this.uid = res;
      this.fet.getUserInfo(res).subscribe((user) => {
        this.user = user;
      }
      )
    });
  }

  updateProfile(){
    this.store.updateProfile(this.user).subscribe(()=>{
      ("updated");
    },(err)=>{
      ("Error updating");
      
    })
  }

}
