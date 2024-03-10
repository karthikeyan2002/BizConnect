import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  
  user: any[] = []; 
  business:any[]=[];
  displayedColumns: string[] = ['uid', 'name', 'viewMore']; 
  displayedColumns2: string[] = ['bid', 'Business_name', 'viewMore']; 
  canLogin:boolean = false;
  dataSource = this.user;
  dataSource2 = this.business;

  constructor(private fet: FetchService,private route:Router,private auth:AuthService) {
    this.canLogin = this.auth.value;
    this.fet.fetchUsers().subscribe((res) => {
      this.user = Object.values(res);
      this.dataSource = this.user; 
    });
    this.fet.fetchBusiness().subscribe((res)=>{
      this.business = Object.values(res);
      this.dataSource2 = this.business;
    })
    this.auth.setValue(true)
  }

  viewMore(user:any){
    this.route.navigate(['/admin/userprofile/'+user.uid])
  }

  viewMore2(business:any){
    this.route.navigate(['/admin/businessprofile/'+business.id])
  }
}
