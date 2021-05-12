import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public appConfig: string = 'https://x8ki-letl-twmt.n7.xano.io/api:SHauWfXW/';
    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {

        //SHOW LOADER BAR #EXTRA Changes

        return this.http.post<any>(`${this.appConfig}auth/login`, { email, password, })
            .pipe(map(loginResponse => {
                console.log(loginResponse);
                    localStorage.setItem('token', JSON.stringify(loginResponse.auth_token));
                    localStorage.setItem('userType', JSON.stringify(loginResponse.auth_admin));
                return loginResponse;
            }),catchError(err => { return throwError("Error thrown from Server");}));
    }
}