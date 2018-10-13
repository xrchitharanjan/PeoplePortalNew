import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../services/peopleservice.service'

@Component({
  templateUrl: './fetchPeople.component.html'
})

export class FetchPeopleComponent {
  public peopleList: PeopleData[];

  constructor(public http: Http, private _router: Router, private _PeopleService: PeopleService) {
    this.getPeoples();
  }

  getPeoples() {
    this._PeopleService.getPeoples().subscribe(
      data => this.peopleList = data
    )
  }

  delete(PeopleID) {
    var ans = confirm("Do you want to delete customer with Id: " + PeopleID);
    if (ans) {
      this._PeopleService.deletePeople(PeopleID).subscribe((data) => {
        this.getPeoples();
      }, error => console.error(error))
    }
  }
}

interface PeopleData {
  Id: number;
  firstName: string;
  surName: string;
  middleName: string;
  gender: string;

}