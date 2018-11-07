import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ImageService {
  myAppUrl: string = "";

  constructor(private _http: Http, private sanitizer: DomSanitizer, @Inject('BASE_URL') baseUrl: string) {
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

  getProfileImage(peopleId: number) {
    let _url = this.myAppUrl + 'api/images/profilepic/' + peopleId;
    //return _url;
    //let result = this._http.get(_url,{ responseType: ResponseContentType.Blob })
    let result = this._http.get(_url)
      .map((response: Response) => response)     
    return result;
  }

  public getProfilePicture(peopleId: number): any {
    let _url = this.myAppUrl + 'api/images/profileimage/' + peopleId;
    return this._http.get(_url).map(image => image.text().slice(1,-1))
    //.map(image => image.text())
    //  .subscribe(
    //    data => {
    //      let imageData = data.slice(1, -1);
    //      return imageData;
    //      //return this.sanitizer.bypassSecurityTrustUrl(data.slice(1, -1));
    //    }
    //  );
  }

  getProfileImageAsBlob(peopleId: number): any {
    let _url = this.myAppUrl + 'api/images/profilepic/' + peopleId;

    let headers = new Headers({ 'Access-Control-Allow-Origin': '*', });
    let options = new RequestOptions({ headers: headers });

    this._http.get(_url, options)
      .toPromise()
      .then((data: any) => {    
        var contentType = headers['content-type'];
        var blob = new Blob([data], { type: contentType });
        //Create a url to the blob 
        return window.URL.createObjectURL(blob);

      });

  }

  getProfileImageUrl(peopleId) {
    let _url = this.myAppUrl + 'api/images/profileimage/' + peopleId;
    return _url;
  }



  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}