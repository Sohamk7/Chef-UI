import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/dataservice';
declare var $ : any;

@Component({
  selector: 'app-edit-profile-chef',
  templateUrl: './edit-profile-chef.component.html',
  styleUrls: ['./edit-profile-chef.component.scss']
})
export class EditProfileChefComponent implements OnInit {
id:any;
userData:any={};
userData1:any;
  // cuisineNamesList: Response;
  constructor(  private _dataService :DataService,private activateroute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.id = this.activateroute.snapshot.params.id;
    console.log("chefID==>",this.id)
    // this.getchef();
    // this.getchefProfile();
    this.getCurrentChefInfo();
    // this.addressProfile()
    //  this.updateProfile();
  } 

getCurrentChefInfo() {
  this._dataService.getChefInfo({url:'chef?chef_id=' + this.id, isLoader:false})
  .subscribe(response => {
    this.userData = response;
    console.log("Cgef Reponce ====>",this.userData);
    
    // console.log("all data of current chef===>",this.userData);
    // this.showLoader = false;
  });
}



updateProfile(){
  console.log("update method=>",this.userData)

  let em={
    chef_id :this.id,
    email:this.userData[0].email,
  }
  this._dataService.post({url:'chef/details/email',data:em, isLoader:false}).subscribe((res:any)=>{
    console.log("email=>",res)
  });
  let em1={
    chef_id :this.id,
    phone_number:this.userData[0].phone_number,
  }
  this._dataService.post({url:'chef/details/phone_number',data:em1, isLoader:false}).subscribe((res:any)=>{
      console.log("phone_number=>",res)
    });
  }
    // let em3={
    //   chef_id :this.id,
    //   phone_number:this.userData[0].phone_number,
    // }
    addressProfile(){

    this._dataService.get({url:'chef/chef_store/address'+this.id, isLoader:false} ).subscribe((res:any)=>{
      // this.userData.push(res[0])
      console.log("hhhhhhhhh=",res)
    //  res= res._chef_profile._chef_store_address;
    //   console.log("hhhhhhhhhaaaaaaaaaaaaaaa=",res)
    });
        }      // res=res._chef_profile._chef_store_address;
      // console.log("address===>",res);
  
    
  
  



  // this._dataService.post({url:'chef/details/email',data:em1, isLoader:false}).subscribe((res:any)=>{
  //   console.log("first_name=>",res)
  // });
  // this._dataService.post({url:'chef/details/email',data:em, isLoader:false}).subscribe((res:any)=>{
  //   console.log("second_name=>",res)
  // });

  // this._dataService.post({url:'chef/details/phone_number',data:em, isLoader:false}).subscribe((res:any)=>{
  //   console.log("phone_number=>",res)
  // });



// getCuisineList() {
//   this._dataService.get({url:'cuisines/options', isLoader:true})
//   .subscribe(response => {
//     this.showLoader= false;
//     this.cuisineNamesList = response;
//     this.filteredCuisinesMulti.next(this.cuisineNamesList.slice());
//     console.log(response);
//   });
// }

//for time
//  $(document){
// $('.add').click(function(){
// $(".list").append(
// '<div class="mb-2 row justify-content-between px-3">' +
//     '<select class="mob mb-2">' +
//         '<option value="opt1">Mon-Fri</option>' +
//         '<option value="opt2">Sat-Sun</option>' +
//         '</select>' +
//     '<div class="mob">' +
//         '<label class="text-grey mr-1">From</label>' +
//         '<input class="ml-1" type="time" name="from">' +
//         '</div>' +
//     '<div class="mob mb-2">' +
//         '<label class="text-grey mr-4">To</label>' +
//         '<input class="ml-1" type="time" name="to">' +
//         '</div>' +
//     '<div class="mt-1 cancel fa fa-times text-danger">' +
//         '</div>' +
//     '</div>');
// });

// $(".list").on('click', '.cancel', function(){
// $(this).parent().remove();
// });

// }
}
