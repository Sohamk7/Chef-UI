import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Login } from 'app/_models';
// import { AppConfig } from 'app/_services';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // private currentUserSubject: BehaviorSubject<Login>;
    // public portalUser: Observable<Login>;
    public appConfig: string = 'https://x8ki-letl-twmt.n7.xano.io/api:SHauWfXW/';
    constructor(private http: HttpClient) {
    //     this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('token')));
    //     this.portalUser         = this.currentUserSubject.asObservable();
    //     this.appConfig          = AppConfig.Settings;
    }

    // public get currentUserValue() {
    //     const  jwtHelper  = new JwtHelperService();
    //     const  Isexpired  = this.currentUserSubject.value ? jwtHelper.isTokenExpired(this.currentUserSubject.value.token) : true;
    //     const  guardInfo  = {
    //         'token':this.currentUserSubject.value ? jwtHelper.decodeToken(this.currentUserSubject.value.token) : null || '', 
    //         'isExpired':Isexpired,
    //         'last_login':this.currentUserSubject.value ? this.currentUserSubject.value.last_login : '',
    //         'tokenstring':this.currentUserSubject.value ? this.currentUserSubject.value.token : null || '', 
    //     };
    //     return guardInfo;
    // }
    /** set current uservalue after update welcome popup */
    // public set currentUserValue(tokenInfo:any) {
    //     this.currentUserSubject.next(tokenInfo);
    // }

    login(email: string, password: string) {

        //SHOW LOADER BAR #EXTRA Changes

        // let rememberMe = remember==true ? 'Y' : 'N'; //EXTRA Changes
        return this.http.post<any>(`${this.appConfig}auth/login`, { email, password, })
            .pipe(map(loginResponse => {
                console.log(loginResponse);
                // login successful if there's a jwt token in the response
                // if (loginResponse && loginResponse.tokeninfo && loginResponse.status==200) {
                //     // store loginResponse details and jwt token in local storage to keep loginResponse logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(loginResponse.auth_token));
                //     localStorage.setItem('settings', JSON.stringify(loginResponse.settings));
                    localStorage.setItem('userType', JSON.stringify(loginResponse.auth_admin));
                //     this.currentUserSubject.next(loginResponse.tokeninfo);
                // }
                // loginResponse.redirectUrl = this.appConfig.url.redirectAfterLogin
                return loginResponse;
            }),catchError(err => { return throwError("Error thrown from Server");}));
    }
}