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
    private dataService :DataService
  ) { }

  ngOnInit(): void {

    console.log(this.data);

    if(this.data!==null){

      this.message = 'Create New Product';
      let product_details = this.data._product_details;

      this.createProductForm = this._fb.group({
        name: this._fb.control(product_details.name,[Validators.required]),
        price: this._fb.control(product_details.price,[Validators.required]),
        description: this._fb.control(product_details.description,[Validators.required]),
        vegetarian: this._fb.control(product_details.vegetarian),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('')
      });

      this.tmp_avatar_img = product_details._product_media_of_product_details.media_url.url;

      this.toDataURL(product_details._product_media_of_product_details.media_url.url, function (dataUrl) {
        // this.file = dataUrl;
console.log(dataUrl)
    })
    }else{

      this.message = 'Edit Product';

      this.createProductForm = this._fb.group({
        name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required]),
        description: this._fb.control('',[Validators.required]),
        vegetarian: this._fb.control(false),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('',[Validators.required])
      });
    }
  }
  

  toDataURL(url, callback) {
    let base64;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          base64 = reader.result;
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
        console.log(base64);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  fileChangeEvent(event: any): void {
    const file = event && event.target.files[0] || null;
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    console.log(file);
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
    let url = this.data!==null ? 'product/' + this.data._product_details.id : 'product/create';
    if(this.data!==null){
      mediaInfo.append('product_id',this.data._product_details.id);
    }

    mediaInfo.append('name',formValue.name);
    mediaInfo.append('price',formValue.price);
    mediaInfo.append('description',formValue.description);
    mediaInfo.append('vegetarian',formValue.vegetarian);
    mediaInfo.append('chef_id',formValue.chef_id);
    mediaInfo.append('product_media',this.file);
   
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
        // this.uploadInfo.url = uploadResponse.media.image ? AppConfig.Settings.url.mediaUrl + uploadResponse.media.image + this.dateTemp : ""; 
        // this.imageUploaded.emit({'uploadResponse':uploadResponse,'formControlName':this.uploadInfo.formControlName});
    },
    error => {
        // Show the error message
        // this.showSnackBar(error.message, 'RETRY', 2000);
    });
   
  }

  RemovePicture() {
    this.tmp_avatar_img = '';
  }

}
