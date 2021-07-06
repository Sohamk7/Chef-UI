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
  createProductVarientCategoryForm: FormGroup;
  public isSubmit: boolean = false;
  public loader = false;
  public showLoader: boolean = true;
  public data;
  public type;

  constructor(
    public dialogRef                      : MatDialogRef<AddProductVarientsComponent>,
    @Inject(MAT_DIALOG_DATA) public _data  : any,
    private _fb: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private currencyPipe : CurrencyPipe,) { 
      this.data = this._data.rowdata;
      this.type = this._data.type;
  }

  ngOnInit(): void {

    console.log(this.data);

    if(this.type === 'edit' && this.data!==null){

      this.createProductVarientForm = this._fb.group({
        id: this._fb.control(this.data.id),
        option_name: this._fb.control(this.data.option_name,[Validators.required]),
        price: this._fb.control(this.data.price,[Validators.required,Validators.pattern("^[0-9]*$")]),
        default: this._fb.control(this.data.default),
      });

    }else if(this.type==='add'){

      this.createProductVarientForm = this._fb.group({
        id: this._fb.control(0),
        option_name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
        default: this._fb.control(false),
      });
    }else if(this.type==='var_cat'){
      this.createProductVarientCategoryForm = this._fb.group({
        name: this._fb.control('',[Validators.required]),
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

    if(this.type === 'var_cat'){
      if(this.createProductVarientCategoryForm.valid){

        this.loader = true;
        let formValue = this.createProductVarientCategoryForm.value;
        this.isSubmit = true;
          // Show the success message
          this._matSnackBar.open('Varient Category added', 'CLOSE', {
            verticalPosition: 'bottom',
            horizontalPosition:'center',
            duration        : 2000
        });
        
        this.dialogRef.close({type:this.type,rowdata:formValue});
        this.isSubmit = false;
  
      }
      else{
        CommonUtils.validateAllFormFields(this.createProductVarientForm);
      }
    }else if(this.type === 'edit' || this.type ==='add'){

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
        
        this.dialogRef.close({type:this.type,rowdata:formValue});
        this.isSubmit = false;
      }
      else{
        CommonUtils.validateAllFormFields(this.createProductVarientForm);
      }
    }    
  }
}
