import { Directive, ChangeDetectionStrategy, Component, Input, OnInit, Injectable,  } from '@angular/core';
import { ImageService } from '../../services/imageservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PeopleService } from '../../Services/peopleservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: './viewpeople.component.html',
  styleUrls: ['./viewpeople.component.css'],
  providers: [ImageService, PeopleService]
})


@Injectable()
export class viewPeople implements OnInit {
  @Input()
  public id: number = 0;
  public name: string = "";
  public firstname: string = "";
  public middlename: string = "";
  public surname: string = "";
  public gender: string = "";
  public aboutme: string = "";
  public hobbies: string = "";
  public designation: string = "";

  public profilepic: string = "";
  public peopleData: any;

  public errorMessage: any;

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')||"0");
    this.getPeopleDetails(this.id);
  }

  constructor(private _ImageService: ImageService, private _PeopleService: PeopleService, private route: ActivatedRoute) {

  }

  getPeopleDetails(peopleId: number): any {
    this._PeopleService.getPeopleDetails(peopleId).subscribe((data) => {
      this.peopleData = data;
      this.profilepic = data.imageFile;
      this.firstname = data.firstName;
      this.middlename = data.middleName;
      this.surname = data.surName;
      this.aboutme = data.profileDescription;
      this.designation = data.designation;
      this.hobbies = data.hobbies;
    });
  }

}
