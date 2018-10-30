import { ChangeDetectionStrategy, Component, Input, OnInit, Injectable } from '@angular/core';
import { PeopleService } from '../../services/peopleservice.service';
import { ImageService } from '../../services/imageService.service';
import { People } from '../../classes/People';

@Component({
  selector: 'spa-people-list',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ImageService, PeopleService]
})

@Injectable()
export class PeopleListComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input()
  public PplList: any = [];

  constructor(private peopleServices: PeopleService, private imageServices: ImageService) {
    //peopleServices.getPeoples()
    //  .subscribe(_ => this.PeopleList = _);
  }
}
