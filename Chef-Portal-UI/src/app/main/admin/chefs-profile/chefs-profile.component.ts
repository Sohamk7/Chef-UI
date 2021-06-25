import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-chefs-profile',
  templateUrl: './chefs-profile.component.html',
  styleUrls: ['./chefs-profile.component.scss']
})
export class ChefsProfileComponent implements OnInit {

  public userInfo: any = {};
  public cuisineNames: any = [];
  public showLoader:boolean = true;
  public chef_id: number = 0;

  constructor(
    private _dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.snapshot.subscribe(params => {
      this.chef_id = this.route.snapshot.params.id;
    // });
    console.log(this.chef_id);
    console.log(this.route);

    this.getCurrentChefInfo();
    this.getCusineList();
  }

  getCurrentChefInfo() {

    this._dataService.getChefInfo({url:'chef/chef_id=' + this.chef_id, isLoader:true})
    .subscribe(response => {
      this.userInfo = response;
      this.showLoader = false;
    });
  }

  getCusineList() {
    this._dataService.getAll({url:'chef/chef_store/cuisines', isLoader:true})
    .subscribe(response => {
      this.cuisineNames = response[0]._cuisines as any;
    });
  }  
}
