import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {

 
  createManuForm:FormGroup;
  productsList: any = [];
  public message:string = '';

  constructor(
    public dialogRef                      : MatDialogRef<CreateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private dataService :DataService) { 
    this.getProducts();
  }

  ngOnInit(): void {

    if(this.data!==null){

      this.message = 'Edit Menu';
      let menu_details = this.data;

      this.createManuForm = this._fb.group({
        name: this._fb.control(menu_details.name,[Validators.required, Validators.minLength(5)]),
        description: this._fb.control(menu_details.description,[Validators.required, Validators.minLength(15)]),
        products: this._fb.control([], [Validators.required]),
        chef_id: this._fb.control(0),
        menu_id: this._fb.control(menu_details.id)
      });

      let productNameToDispaly: any = []; 
      menu_details._products.forEach(product => {
        productNameToDispaly.push(product.product_id);
      });
      this.createManuForm.controls['products'].setValue(productNameToDispaly)
    }else{

      this.message = 'Create Menu';

      this.createManuForm = this._fb.group({
        name: this._fb.control('',[Validators.required, Validators.minLength(5)]),
        description: this._fb.control('',[Validators.required, Validators.minLength(15)]),
        products: this._fb.control([], [Validators.required]),
        chef_id:this._fb.control(0),
      });
    }
  }

  getProducts() {

    this.dataService.getAll({url:'product',isLoader:true})
    .subscribe(response =>{
      this.productsList = response;
    });
  }
  
  onSubmit() {

    if (this.createManuForm.invalid) {
      return;
    }
    let formValue = this.createManuForm.value;
    //Define formdata
    let message = this.data!==null ? 'Menu Edited successfully' : 'Menu created successfully';
    let url = this.data!==null ? 'menu/update' : 'menu/create';
    
    this.dataService.save({url: url, data:formValue})
      .subscribe(uploadResponse=>{
        console.log(uploadResponse);
        this.dialogRef.close();
        // Show the success message
        this._matSnackBar.open(message, 'CLOSE', {
          verticalPosition: 'bottom',
          horizontalPosition:'center',
          duration        : 2000
      });
    },
    error => {
       // Show the error message
        this._matSnackBar.open(error.message, 'RETRY', {
          verticalPosition: 'bottom',
          horizontalPosition:'center',
          duration        : 2000
      });
    });
   
  }
}

