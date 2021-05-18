import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    public dialogRef                      : MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private dataService :DataService
  ) { }

  ngOnInit(): void {

    this.createProductForm = this._fb.group({
        name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required]),
        description: this._fb.control('',[Validators.required]),
        vegetarian: this._fb.control(false),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('',[Validators.required])
    });
  }

  fileChangeEvent(event: any): void {
    const file = event && event.target.files[0] || null;
    // this.tmp_avatar_img = URL.createObjectURL(event.target.files[0]);
    console.log(event)
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      // let base64Image = event.target.result;
      this.file = event.target.result;
      // this.file = base64Image.replace(/^data:image\/\w+;base64,/, ""); 
      // this.file = btoa(event.target.result);
      this.tmp_avatar_img = event.target.result;
      // this.saveWithoutCrop(event.target.result);
    }
  }

  //  /**Save Media Without Cropping On user general settings page /users/settings */
  //  saveWithoutCrop(image){
  //   //Define formdata
  //   let mediaInfo = new FormData();
  //   mediaInfo.append('product_image',image);
  //   this.dataService.saveMedia({url:'product',data:mediaInfo})
  //     .subscribe(uploadResponse=>{
  //       console.log(uploadResponse);
  //   //     // Show the success message
  //   //     // this.showSnackBar(uploadResponse.message, 'CLOSE', 2000);
  //   //     // this.uploadInfo.url = uploadResponse.media.image ? AppConfig.Settings.url.mediaUrl + uploadResponse.media.image + this.dateTemp : ""; 
  //   //     // this.imageUploaded.emit({'uploadResponse':uploadResponse,'formControlName':this.uploadInfo.formControlName});
  //   },
  //   error => {
  //       // Show the error message
  //       // this.showSnackBar(error.message, 'RETRY', 2000);
  //   });
  // }

  onSubmit() {

    if (this.createProductForm.invalid) {
      return;
    }
    let formValue = this.createProductForm.value;
    //Define formdata
    let mediaInfo = new FormData();

    mediaInfo.append('name',formValue.name);
    mediaInfo.append('price',formValue.price);
    mediaInfo.append('description',formValue.description);
    mediaInfo.append('vegetarian',formValue.vegetarian);
    mediaInfo.append('chef_id',formValue.chef_id);
    mediaInfo.append('product_media',this.file);
    this.dataService.saveMedia({url:'product/create',data:mediaInfo})
      .subscribe(uploadResponse=>{
        console.log(uploadResponse);
        this.dialogRef.close();
        // Show the success message
        // this.showSnackBar(uploadResponse.message, 'CLOSE', 2000);
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
