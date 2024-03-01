import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FetchService } from 'src/app/shared/services/fetch.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id: string = '';
  type: string = '';

  constructor(private route: ActivatedRoute, private fet: FetchService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchType();
  }

  fetchType() {
    return this.fet.fetchType(this.id).subscribe((res) => {
      this.type = res;
    })
  }
}
