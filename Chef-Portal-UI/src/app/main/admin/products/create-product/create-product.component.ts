import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  createProductForm:FormGroup;
  public inputAccpets : string = ".jpeg, .jpg, .png";
  private file: string | null = null;
  public tmp_avatar_img;
  public message:string = '';

  constructor(
    public dialogRef                      : MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private dataService :DataService,
    private currencyPipe : CurrencyPipe
  ) { }

  ngOnInit(): void {

    console.log(this.data);

    if(this.data!==null){

      this.message = 'Edit Product';
      let product_details = this.data._product_details;

      this.createProductForm = this._fb.group({
        name: this._fb.control(product_details.name,[Validators.required]),
        price: this._fb.control(product_details.price,[Validators.required,Validators.pattern("^[0-9]*$")]),
        description: this._fb.control(product_details.description,[Validators.required]),
        vegetarian: this._fb.control(product_details.vegetarian),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('')
      });

      this.tmp_avatar_img = product_details._product_media_of_product_details.media_url.url;

    }else{

      this.message = 'Edit Product';

      this.createProductForm = this._fb.group({
        name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
        description: this._fb.control('',[Validators.required]),
        vegetarian: this._fb.control(false),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('',[Validators.required])
      });
    }
  }

  transformAmount(element){
    let formattedAmount = this.currencyPipe.transform(this.createProductForm.get('price').value, 'EUR');

    element.target.value = formattedAmount;
  }
  
  fileChangeEvent(event: any): void {
    const file = event && event.target.files[0] || null;
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.file = event.target.result;
      this.tmp_avatar_img = event.target.result;
    }
  }

  onSubmit() {

    if (this.createProductForm.invalid) {
      return;
    }
    let formValue = this.createProductForm.value;
    //Define formdata
    let mediaInfo = new FormData();
    let message = this.data!==null ? 'Product Edited successfully' : 'Product created successfully';
    let url = this.data!==null ? 'product/' + this.data.id : 'product/create';
    if(this.data!==null){
      mediaInfo.append('product_id',this.data.id);
    }

    if(this.file!== null) {
      mediaInfo.append('product_media',this.file);
    }
   
    mediaInfo.append('name',formValue.name);
    mediaInfo.append('price',formValue.price);
    mediaInfo.append('description',formValue.description);
    mediaInfo.append('vegetarian',formValue.vegetarian);
    mediaInfo.append('chef_id',formValue.chef_id);
    
   
    this.dataService.saveMedia({url: url,data:mediaInfo})
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

  RemovePicture() {
    this.tmp_avatar_img = '';
  }

}
