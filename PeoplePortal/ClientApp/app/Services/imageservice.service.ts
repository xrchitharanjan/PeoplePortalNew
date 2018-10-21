import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ImageService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }    

  saveImage(fileToUpload) {
    debugger;
    //let _url = this.myAppUrl + 'api/images/create';
    //let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    //let options = new RequestOptions({ headers: headers });
    //this._http.post(_url, fileToUpload, options)


    let _url = this.myAppUrl + 'api/images/test';    
    let result = this._http.post(_url, fileToUpload);
    return this._http.post(_url, 123);
    //this._http.post(_url, fileToUpload, options)

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