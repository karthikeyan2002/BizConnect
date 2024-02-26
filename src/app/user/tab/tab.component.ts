import { Component, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;

  moveToRegister() {
    if(this.tabGroup){
      this.tabGroup.selectedIndex = 1; 
    }
  }

  moveToLogin(){
    if(this.tabGroup){
      this.tabGroup.selectedIndex = 0;
    }
  }
}
