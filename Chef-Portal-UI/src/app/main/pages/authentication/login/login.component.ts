import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  
    public appConfig: any;
    pwdhide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) { }
// -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
     {
        //  this.loginForm = this._formBuilder.group({
        //      email   : ['', [Validators.required, Validators.email]],
        //      password: ['', Validators.required]
        //  });
     }
    onLogin() {
      // this.submitted = true;
      // this.returnUrl = this.route.snapshot.queryParams.returnUrl || this.appConfig.url.redirectAfterLogin;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      let formValue = this.loginForm.value

      this.authenticationService.login(formValue.email, formValue.password,)
          .pipe(first())
          .subscribe(
              data => {
                  let duration = data.status==200 ? 2000 : 50000;
                  // Show the success message
                  this._matSnackBar.open('Login successfully', 'CLOSE', {
                      verticalPosition: 'bottom',
                      horizontalPosition:'center',
                      duration        : 2000
                  });
                  this._router.navigate(['admin/dashboard']);
                  
              },
              error => {
                  // Show the error message
                  this._matSnackBar.open('Incorrect username or password', 'Retry', {
                      verticalPosition: 'bottom',
                      horizontalPosition:'center',
                      duration        : 2000
                  });
                  this.loginForm.reset();
          });
     
     }
}
