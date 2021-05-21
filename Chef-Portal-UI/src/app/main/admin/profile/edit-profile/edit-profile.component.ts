import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  message: string = '';
  editEmailForm:FormGroup;
  editPasswordForm:FormGroup;
  editPhoneNoForm:FormGroup;
  editStoreAddressForm:FormGroup;
  pwdhide:boolean = true;
  cpwdhide: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private _dataService :DataService
  ) { }
  

  ngOnInit(): void {

    if(this.data.type === 'email') {
      this.message = 'Edit Chef Email';
      this.EditEmailFormGroup();
    }else if(this.data.type === 'password'){
      this.message = 'Edit Chef Password';
      this.EditPasswordFormGroup();
    }else if(this.data.type === 'phoneNo'){
      this.message = 'Edit Chef Phone Number';
      this.EditPhoneNoFormGroup();
    }else if(this.data.type === 'address'){
      this.message = 'Edit Chef Store Address';
      this.EditStoreAddressFormGroup();
    }
  }

  EditEmailFormGroup() {
    this.editEmailForm = this._fb.group({
      email: this._fb.control('', [Validators.required,Validators.email])
    });
  }

  EditPasswordFormGroup() {
    this.editPasswordForm = this._fb.group({
      password: this._fb.control('', [Validators.required,Validators.minLength(8)]),
      confirm_password: this._fb.control('',[Validators.required, confirmPasswordValidator])
    });
  }

  EditPhoneNoFormGroup() {
    this.editPhoneNoForm = this._fb.group({
      phone_number: this._fb.control('', [Validators.required,Validators.pattern("^((\\+44-?)|0)?[0-9]{10}$")])
    });
  }

  EditStoreAddressFormGroup() {
    this.editStoreAddressForm = this._fb.group({
      address_1: this._fb.control('', [Validators.required]),
      address_2: this._fb.control(''),
      address_3: this._fb.control(''),
      city: this._fb.control('', [Validators.required]),
      country: this._fb.control('', [Validators.required]),
      postcode: this._fb.control('', [Validators.required, Validators.minLength(6),Validators.maxLength(6)]),
    });
  }

  emailSubmit() {
    let message = 'Email Edited Successfully';
    this.postAPIResponse('chef/details/email',this.editEmailForm.value,message);

  }

  passwordSubmit() {
    let message = 'Password Edited Successfully';
    this.postAPIResponse('chef/details/password',this.editPasswordForm.value,message);
  }

  phoneNoSubmit() {
    let message = 'Phone No Edited Successfully';
    this.postAPIResponse('chef/details/phone_number',this.editPhoneNoForm.value,message);
  }

  storeAddressSubmit() {
    let message = 'Store Address Edited Successfully';
    this.postAPIResponse('chef/chef_store/address',this.editStoreAddressForm.value,message);
  }

  postAPIResponse(url, value, message){
    this._dataService.save({url:url,data:value,isLoader:true})
      .pipe(first())
      .subscribe(
          data => {
              // Show the success message
              this._matSnackBar.open(message, 'CLOSE', {
                  verticalPosition: 'bottom',
                  horizontalPosition:'center',
                  duration        : 2000
              });
              this.dialogRef.close();
          },
          error => {
              // Show the error message
              this._matSnackBar.open('please try again', 'Retry', {
                  verticalPosition: 'bottom',
                  horizontalPosition:'center',
                  duration        : 2000
              });
      });
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
 export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirm_password');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ((password && password.value && password.value.trim()) === (passwordConfirm && passwordConfirm.value && passwordConfirm.value.trim()))
  {
      return null;
  }

  return {passwordsNotMatching: true};
};


