import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonUtils } from 'src/app/_helpers/common.utils';

@Component({
  selector: 'app-add-product-varients',
  templateUrl: './add-product-varients.component.html',
  styleUrls: ['./add-product-varients.component.scss']
})
export class AddProductVarientsComponent implements OnInit {
  createProductVarientForm:FormGroup;
  public isSubmit: boolean = false;
  public loader = false;
  public showLoader: boolean = true;

  constructor(
    public dialogRef                      : MatDialogRef<AddProductVarientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private currencyPipe : CurrencyPipe,) { 
  }

  ngOnInit(): void {

    console.log(this.data);

    if(this.data!==null){

      // this.createProductForm = this._fb.group({
      //   name: this._fb.control(product_details.name,[Validators.required]),
      //   price: this._fb.control(product_details.price,[Validators.required,Validators.pattern("^[0-9]*$")]),
      //   description: this._fb.control(product_details.description,[Validators.required]),
      //   allergense: this._fb.control([], [Validators.required]),
      //   dietaries: this._fb.control([], [Validators.required]),
      //   varients: this._fb.control([], [Validators.required]),
      //   chef_id:this._fb.control(1),
      //   product_image: this._fb.control('')
      // });

    }else{

      this.createProductVarientForm = this._fb.group({
        option_name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
        default: this._fb.control(false),
      });
    }
  }


  transformAmount(element){
    let formattedAmount = this.currencyPipe.transform(this.createProductVarientForm.get('price').value, 'EUR');

    element.target.value = formattedAmount;
  }
  
  onSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    if (this.createProductVarientForm.valid) {
      this.loader = true;
      let formValue = this.createProductVarientForm.value;
      this.isSubmit = true;
        // Show the success message
        this._matSnackBar.open('Varient added', 'CLOSE', {
          verticalPosition: 'bottom',
          horizontalPosition:'center',
          duration        : 2000
      });
      
      this.dialogRef.close(formValue);
      this.isSubmit = false;

    }else{
      CommonUtils.validateAllFormFields(this.createProductVarientForm);
    }
  }
}
