import { Component } from '@angular/core';
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

  dataSource = this.user;
  dataSource2 = this.business;

  constructor(private fet: FetchService) {
    this.fet.fetchUsers().subscribe((res) => {
      this.user = Object.values(res);
      this.dataSource = this.user; 
    });
    this.fet.fetchBusiness().subscribe((res)=>{
      this.business = Object.values(res);
      this.dataSource2 = this.business;
    })
  }

  viewMore(user:any){

  }
}
