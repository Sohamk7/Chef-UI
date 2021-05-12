import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-become-achefs',
  templateUrl: './become-achefs.component.html',
  styleUrls: ['./become-achefs.component.scss']
})
export class BecomeAChefsComponent implements OnInit {

  becomechefsForm= new FormGroup({
    first_name: new FormControl('', Validators.required),
    second_name: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirm_password: new FormControl('',[Validators.required, confirmPasswordValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  pwdhide:boolean = true;
  cpwdhide: boolean = true;
  constructor(
    private _formBuilder:FormBuilder,
    private _router:Router,
    private _matSnackBar: MatSnackBar,
    private _dataService:DataService
  ) { }

  ngOnInit(): void {
      // this.becomechefsForm = this._formBuilder.group({
      //        email   : ['', [Validators.required, Validators.email]],
      //        password: ['', Validators.required]
      //    });
  }

  onSubmit(){

    if (this.becomechefsForm.invalid) {
      return;
  }
  let formValue = this.becomechefsForm.value

  this._dataService.post({url:'auth/create_chef',data:formValue,isLoader:true})
      .pipe(first())
      .subscribe(
          data => {
              // Show the success message
              this._matSnackBar.open('chefs successfully', 'CLOSE', {
                  verticalPosition: 'bottom',
                  horizontalPosition:'center',
                  duration        : 2000
              });
              this._router.navigate(['/auth/login']);
          },
          error => {
              // Show the error message
              this._matSnackBar.open('please try', 'Retry', {
                  verticalPosition: 'bottom',
                  horizontalPosition:'center',
                  duration        : 2000
              });
              this.becomechefsForm.reset();
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


