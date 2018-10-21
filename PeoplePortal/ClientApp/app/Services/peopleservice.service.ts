import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PeopleService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getCityList() {
        return this._http.get(this.myAppUrl + 'api/People/GetCityList')
            .map(res => res.json())
            .catch(this.errorHandler);
    }

    getPeoples() {
        return this._http.get(this.myAppUrl + 'api/People/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getPeopleById(id: number) {
        return this._http.get(this.myAppUrl + "api/People/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    savePeople(People) {
        return this._http.post(this.myAppUrl + 'api/People/Create', People)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
  }

  saveImage(People) {
    debugger;
    let _url = this.myAppUrl + 'api/images/create';
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    //this._http.post(_url, fileToUpload, options)


    _url = this.myAppUrl + 'api/images/createfile';    
    this._http.post(_url, People)

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

    updatePeople(People) {
        return this._http.put(this.myAppUrl + 'api/People/Edit', People)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deletePeople(id) {
        return this._http.delete(this.myAppUrl + "api/People/Delete/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}