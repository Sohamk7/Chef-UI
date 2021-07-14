import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-chef-payment',
  templateUrl: './chef-payment.component.html',
  styleUrls: ['./chef-payment.component.scss']
})
export class ChefPaymentComponent implements OnInit {
  id:any;
  constructor(private dataservice:DataService,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(
      (res:any)=>{
        this.id = res['chef_id']
      }
    )
  }


  getPaymentStatus(){
      this.dataservice.getAll({url:'chef/stripe/account?chef_id='+this.id,isLoader:true}).subscribe(
        (res:any)=>{
          console.log("PAYMENTS RESPONCE ======>",res);
          
        }
      )
  }
}
