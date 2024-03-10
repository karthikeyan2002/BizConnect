import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  id:any;
  userData:any;
  canLogin:boolean = false;
  
  constructor(private route: ActivatedRoute,private fet:FetchService,private auth:AuthService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fet.getUserInfo(this.id).subscribe((res)=>{
      this.userData = res;
      console.log(this.userData);
      this.auth.setValue(true)
    })
  }
}
