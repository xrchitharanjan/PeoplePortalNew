import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchPeopleComponent } from '../fetchPeople/fetchPeople.component';
import { PeopleService } from '../../services/peopleservice.service';
import { ImageService } from '../../services/imageservice.service';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './addpeople.component.html',
  providers: [ImageService]
})

export class createPeople implements OnInit {
  PeopleForm: FormGroup;
  title: string = "Create";
  PeopleId: number = 0;
  errorMessage: any;
  ImageFile: File;
  ImageUrl: string = "";
  cityList: Array<any> = [];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _ImageService: ImageService,
    private _PeopleService: PeopleService, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.PeopleId = this._avRoute.snapshot.params["id"];
    }

    this.PeopleForm = this._fb.group({
      Id: 0,
      firstname: ['', [Validators.required]],
      middlename: [''],
      surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],

    })
  }

  ngOnInit() {

    //this._PeopleService.getCityList().subscribe(
    //    data => this.cityList = data
    //)

    if (this.PeopleId > 0) {
      this.title = "Edit";
      this._PeopleService.getPeopleById(this.PeopleId)
        .subscribe(resp => this.PeopleForm.setValue(resp)
          , error => this.errorMessage = error);
    }

  }

  save() {

    if (!this.PeopleForm.valid) {
      return;
    }

    if (this.title == "Create") {
      this._PeopleService.savePeople(this.PeopleForm.value)
        .subscribe((data) => {
          this.PeopleId = data;
          this.saveImages();
          this._router.navigate(['/fetch-People']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this._PeopleService.updatePeople(this.PeopleForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-People']);
        }, error => this.errorMessage = error)
    }
  }

  saveImages() {
    const fd = new FormData();
    fd.append('ImageFile', this.ImageFile, this.ImageFile.name);
    this._ImageService.saveImage(fd, this.PeopleId)
      .subscribe((data) => {
        this._router.navigate(['/fetch-People']);
      }, error => this.errorMessage = error)

  }

  cancel() {
    this._router.navigate(['/fetch-People']);
  }

 onUpload() {
    const fd = new FormData();
   fd.append('ImageFile', this.ImageFile, this.ImageFile.name);
   this._ImageService.saveImage(fd, this.PeopleId)
      .subscribe((data) => {
        this._router.navigate(['/fetch-People']);
      }, error => this.errorMessage = error)
    //this._ImageService.saveImage(fd);
  }


  onFileSelect(event) {
    let files = event.srcElement.files;
    if (files.length == 0) {
      return;
    }   
    this.ImageFile = <File>event.target.files[0];
    //if (event.target.files && event.target.files[0]) {
    //  var reader = new FileReader();
    //  reader.onload = (event: ProgressEvent) => {
    //    this.ImageUrl = (<FileReader>event.target).result;
    //  }
    //}

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      //reader.onload = e => this.ImageUrl = (<FileReader>event.target).result;
      reader.onload = (event:any) => {
        this.ImageUrl = event.target.result;      }
      reader.readAsDataURL(file);
    }

  }

//  getFile(file) {
//  fileReader.readAsDataUrl(file, $scope)
//    .then(function (result) {
//      $timeout(function () {
//        $scope.ngModel = result;
//      });
//    });
//}


  get firstname() { return this.PeopleForm.get('firstname'); }
  get middlename() { return this.PeopleForm.get('middlename'); }
  get surname() { return this.PeopleForm.get('surname'); }
  get gender() { return this.PeopleForm.get('gender'); }
}