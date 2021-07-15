import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public profile_data: any = {};
  public showLoader: boolean = true;
  id:any='';


  constructor(
    private _dataService : DataService,
    private _activatedRoute:ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
   this._activatedRoute.queryParams.subscribe((params:any)=>{
     this.id =  params['chef_id']
   })
    console.log("CHEF ID FROM HOME ==>",this.id);
    
    this.getProfileCompleteData()
  }

  getProfileCompleteData() {
      this._dataService.getAll({url:'chef/account_progress?chef_id='+this.id,isLoader:true})
      .subscribe(res =>{
        this.profile_data = res;
        this.showLoader = false;
      })
  }


}
