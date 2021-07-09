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

  constructor(  private _dataService :DataService,private activateroute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.id = this.activateroute.snapshot.params.id;
    console.log("testttt",this.id)
    this.getchef();
    // this.updateProfile();
  }
getchef(){
  this._dataService.post({url:'chef',data: this.id, isLoader:false} ).subscribe((res:any)=>{
    console.log("checking",res);
  })
}
updateProfile(){
  // this.postAPIResponse('chef/chef_store/cuisines');

  this._dataService.post({url:'chef/chef_store/cuisines',data: this.id, isLoader:false} ).subscribe((res:any)=>{
    console.log("checking",res);
  });

}
// $(document){

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
