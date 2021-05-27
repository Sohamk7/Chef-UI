import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/dataservice';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userInfo: any = {};
  public cuisineNamesList: any = [];

  constructor(
    private dialog: MatDialog,
    private _dataService: DataService) { }

  ngOnInit(): void {

    this.getCurrentChefInfo();
    this.getCusineList();
  }

  getCurrentChefInfo() {

    this._dataService.getChefInfo({url:'chef', isLoader:true})
    .subscribe(response => {
      this.userInfo = response;
      console.log(response);
    });
  }

  getCusineList() {
    this._dataService.get({url:'cuisines/options', isLoader:true})
    .subscribe(response => {
      this.cuisineNamesList = response;
      console.log(response);
    });
  }

  editChefPassword(type) {
    this.openDialog(type);
  }

  editChefEmail(type) {
    this.openDialog(type);
  }

  editChefPhoneNo(type) {
    this.openDialog(type);
  }

  editChefStoreAddress(type) {
    this.openDialog(type);
  }

  editChefBiography(type) {
    this.openDialog(type);
  }

  editChefProfile(type) {
    this.openDialog(type);
  }

  editChefBanner(type) {
    this.openDialog(type);
  }

  editChefCuisine(type) {
    this.openDialog(type);
  }
  
  openDialog(type) {
    let data = {type:type,profile_id:this.userInfo.chef_profile_id};
    let dialogRef = this.dialog.open(EditProfileComponent, { 
      width:'500px',
      height:'auto',
      disableClose:true,
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=='N') {
        this.getCurrentChefInfo();
      }
    });
  }
}
