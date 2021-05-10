import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  checkUserType: boolean = false;
  
  constructor(
    private router:Router
  ) {
    let userType = localStorage.getItem('userType');
    this.checkUserType = userType === 'true' ? true : false;
    console.log(this.checkUserType);
   }

  ngOnInit(): void {
  }

  logout() {
        
    //SHOW LOADER BAR #EXTRA Changes

    // const token = this.currentUserValue.token;
    // //remove from database 
    // return this.http.post<any>(`${this.appConfig.url.apiUrl}auth/logout`, { token })
    //     .pipe(map(logoutResponse => {
    //         // login successful if there's a jwt token in the response
          
    //         this._fuseProgressBarService.hide();
    //         if (logoutResponse) {
    //             // store loginResponse details and jwt token in local storage to keep loginResponse logged in between page refreshes
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('settings');
    //             localStorage.removeItem('themesettings');
                localStorage.removeItem('userType');
                this.router.navigate(['/']);
    //             this.currentUserSubject.next(null);
    //         }
    //         return logoutResponse;
    //     }),catchError(err => { return throwError("Error in logout");}));



    // this.currentUserSubject.next(null);
}

}
