import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  userType: any;
  constructor() {
    this.userType = localStorage.getItem('userType') ? localStorage.getItem('userType') :'';
   }

  ngOnInit(): void {
  }

}
