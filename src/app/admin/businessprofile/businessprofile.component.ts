import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.component.html',
  styleUrls: ['./businessprofile.component.css']
})
export class BusinessprofileComponent {
  id:any;
  businessData:any;
  canLogin:boolean = false;
  constructor(private route: ActivatedRoute,private fet:FetchService,private auth:AuthService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fet.fetchShop(this.id).subscribe((res)=>{
      this.businessData = res;
      this.auth.setValue(true)
    })
  }
}
