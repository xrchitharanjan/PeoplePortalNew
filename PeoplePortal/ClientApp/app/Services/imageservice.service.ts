import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {
  myAppUrl: string = "";

  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

   saveImage(fd,peopleId) {
    debugger;
     let _url = this.myAppUrl + 'api/images/create/' + peopleId;
     let headers = new Headers({ 'enctype': 'multipart/form-data' });   
     headers.append('Accept', 'application/json');
     let options = new RequestOptions({ headers: headers });
     return this._http.post(_url, fd, options)
       .map((response: Response) => response.json());



       //this._http.post(this.myAppUrl + 'api/Images', fileToUpload, options)
    //  .map((response: Response) => response.json())
    //  .catch(this.errorHandler)
    //let input = new FormData();
    //input.append("file", fileToUpload);
    //let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    //let options = new RequestOptions({ headers: headers });
    //return this._http
    //  .post(this.myAppUrl + 'api/Images', fileToUpload, options);
  }



  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}