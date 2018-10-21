import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchPeopleComponent } from '../fetchPeople/fetchPeople.component';
import { PeopleService } from '../../services/peopleservice.service';
import { ImageService } from '../../services/imageservice.service';

@Component({
  templateUrl: './addpeople.component.html',
  providers: [ImageService]
})

export class createPeople implements OnInit {
  PeopleForm: FormGroup;
  title: string = "Create";
  PeopleId: number;
  errorMessage: any;
  ImageFile: File;
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
          this.saveImages(data);
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

  saveImages(PeopleId) {
    const fd = new FormData();
    //fd.append('PeopleId', PeopleId);
    //fd.append('FileName', this.ImageFile.name);
    //fd.append('ImageFile', this.ImageFile);
    fd.append('ImageFile',this.ImageFile, this.ImageFile.name);
    debugger;
    this._ImageService.saveImage(fd);

  }

  cancel() {
    this._router.navigate(['/fetch-People']);
  }

  onUpload() {
    debugger
    const fd = new FormData();
    fd.append('ImageFile', this.ImageFile, this.ImageFile.name);
    this._ImageService.saveImage(this.PeopleForm.value)
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