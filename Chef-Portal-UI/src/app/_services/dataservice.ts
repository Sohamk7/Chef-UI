import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from './loaderservice';
import { ServerURL } from '../_helpers';


@Injectable()
export class DataService {
   
  setId(){
    
  }
  constructor(
      private http: HttpClient,
      private loader: LoaderService,
    ) {}
  
    startLoader(info: { url: any; data?: any; isLoader?: any; }) {
      // Start loader before API call
      if (info.isLoader !== false) {
        this.loader.start();
      }
    }
  
    stopLoader(info: { url: any; data?: any; isLoader?: any; }) {
      // Reset the loader
      if (info.isLoader !== false) {
        this.loader.stop();
      }
    }

  get(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.get(info.url).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        // console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  // R Get With Body
  getWithBody(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    let t = localStorage.getItem('token').replace('"','');
    let token = t.replace('"','')
   //UPLOAD FILE DATA OPTION HEADERS
   const HttpUploadOptions = {
       headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
   }

    return this.http.get(ServerURL.SERVER_URL_ENDPOINT + info.url,HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        // console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  post(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    
    let t = localStorage.getItem('token').replace('"','');
     let token = t.replace('"','')
    //UPLOAD FILE DATA OPTION HEADERS
    const HttpUploadOptions = {
        headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
    }

    return this.http.post(ServerURL.SERVER_URL_ENDPOINT + info.url, info.data, HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  customerpost(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    
    let t = localStorage.getItem('token').replace('"','');
     let token = t.replace('"','')
    //UPLOAD FILE DATA OPTION HEADERS
    const HttpUploadOptions = {
        headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
    }

    return this.http.post(ServerURL.SERVER_URL_ENDPOINT_CUSTOMER + info.url, info.data, HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  //GET ALL CHEFS LIST
  getAllList(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.post(ServerURL.SERVER_URL_ENDPOINT_CUSTOMER + info.url, info.data).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  
  // R Token Post Method
  postWithToken(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    let t = localStorage.getItem('token').replace('"','');
    let token = t.replace('"','')
   //UPLOAD FILE DATA OPTION HEADERS
   const HttpUploadOptions = {
       headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
   }
    return this.http.post(ServerURL.SERVER_URL_ENDPOINT + info.url, info.data, HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  delete(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    let t = localStorage.getItem('token').replace('"','');
     let token = t.replace('"','')
    //UPLOAD FILE DATA OPTION HEADERS
    const HttpUploadOptions = {
        headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
    }

    return this.http.delete(ServerURL.SERVER_URL_ENDPOINT + info.url, HttpUploadOptions).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }
  
  /** UPLOAD BASE64 IMAGE */
  saveMedia(info: { url: string; data: any; isLoader?: boolean; }){
    this.startLoader(info);
     let t = localStorage.getItem('token').replace('"','');
     let token = t.replace('"','')
    //UPLOAD FILE DATA OPTION HEADERS
    const HttpUploadOptions = {
        headers: new HttpHeaders({  'Accept':'multipart/form-data','Authorization': 'Bearer ' + token })
    }

    return this.http.post(ServerURL.SERVER_URL_ENDPOINT + info.url, info.data, HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
}

save(info: { url: string; data: any; isLoader?: boolean; }){
  this.startLoader(info);
   let t = localStorage.getItem('token').replace('"','');
   let token = t.replace('"','')
  //UPLOAD FILE DATA OPTION HEADERS
  const HttpUploadOptions = {
      headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
  }

  return this.http.post(ServerURL.SERVER_URL_ENDPOINT + info.url, info.data, HttpUploadOptions).pipe(
    map((res) => {
      return this.extractData(res, info);
    }),
    catchError((err: Response) => {
      console.error(err);
      return this.handleErrorPromise(err, info);
    })
  );
}

checkAlreadyExist(info: { url: string; data: any; isLoader?: boolean; }){

  return this.http.post(ServerURL.SERVER_URL_ENDPOINT + info.url, info.data).pipe(
    map((res) => {
      return this.extractData(res, info);
    }),
    catchError((err: Response) => {
      console.error(err);
      return this.handleErrorPromise(err, info);
    })
  );
}

getChefInfo(info: { url: string, isLoader?: boolean; }){
  this.startLoader(info);
   let t = localStorage.getItem('token').replace('"','');
   let token = t.replace('"','')
  //UPLOAD FILE DATA OPTION HEADERS
  const HttpUploadOptions = {
      headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
  }

  return this.http.get(ServerURL.SERVER_URL_ENDPOINT + info.url, HttpUploadOptions).pipe(
    map((res) => {
      return this.extractData(res, info);
    }),
    catchError((err: Response) => {
      console.error(err);
      return this.handleErrorPromise(err, info);
    })
  );
}

getAll(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);
    let t = localStorage.getItem('token').replace('"','');
     let token = t.replace('"','')
    //UPLOAD FILE DATA OPTION HEADERS
    const HttpUploadOptions = {
        headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
    }

    return this.http.get(ServerURL.SERVER_URL_ENDPOINT + info.url, HttpUploadOptions).pipe(
      map((res) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        // console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
}

getAllergensDietaries(info: { url: string; isLoader?: boolean; }): Observable<Response> {
  this.startLoader(info);
  let t = localStorage.getItem('token').replace('"','');
   let token = t.replace('"','')
  //UPLOAD FILE DATA OPTION HEADERS
  const HttpUploadOptions = {
      headers: new HttpHeaders({  'Accept':'application/json','Authorization': 'Bearer ' + token })
  }

  return this.http.get(ServerURL.SERVER_URL_ALLERGENSDIETARY + info.url, HttpUploadOptions).pipe(
    map((res) => {
      return this.extractData(res, info);
    }),
    catchError((err: Response) => {
      // console.error(err);
      return this.handleErrorPromise(err, info);
    })
  );
}

  extractData(res: any, info: { url: string; data?: any; isLoader?: boolean; }) {
    // Complete the loader as valid response is recieved
    this.stopLoader(info);
    return res;
  }

  handleErrorPromise(errorResponse: Response | any, info: { url: string; data?: any; isLoader?: boolean; }) {
    this.stopLoader(info);

    if (
      errorResponse.status == 400
      && errorResponse.error.error == 'invalid_grant'
      && errorResponse.error.error_description == 'Bad credentials'
    ) {
    //   this.notification.toast('Incorrect login id or password.', 'danger', 'Error', 5000);
    } else {
    //   this.notification.toast('An error occured. Please try again.', 'danger', 'Error', 5000);
      // console.log(errorResponse.error.message || errorResponse.statusText);
    }

    return Promise.reject(errorResponse);
  }

}
