import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchPeopleComponent } from '../fetchPeople/fetchPeople.component';
import { PeopleService } from '../../services/peopleservice.service';

@Component({
    templateUrl: './addpeople.component.html'
})

export class createPeople implements OnInit {
    PeopleForm: FormGroup;
    title: string = "Create";
    PeopleId: number;
    errorMessage: any;
    cityList: Array<any> = [];

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _PeopleService: PeopleService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.PeopleId = this._avRoute.snapshot.params["id"];
        }

        this.PeopleForm = this._fb.group({
            PeopleId: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })
    }

    ngOnInit() {

        this._PeopleService.getCityList().subscribe(
            data => this.cityList = data
        )

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

    cancel() {
        this._router.navigate(['/fetch-People']);
    }

    get name() { return this.PeopleForm.get('name'); }
    get gender() { return this.PeopleForm.get('gender'); }
    get department() { return this.PeopleForm.get('department'); }
    get city() { return this.PeopleForm.get('city'); }
}