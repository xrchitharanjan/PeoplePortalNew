import { Component, OnInit, Input } from '@angular/core';
import { People, PeopleFilter } from '../../classes/people';
import { PeopleService } from '../../services/peopleservice.service'
import { ImageService } from '../../services/imageservice.service'


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ImageService, PeopleService]
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }
  public PeopleList: People[] | undefined;

  constructor(private _PeopleService: PeopleService, private _ImageService: ImageService) {
    this.getPeoples();
  }

  @Input() public items: People[] = [];

  public readonly filters: PeopleFilter[] = [
    <PeopleFilter>{ gender: 'Male' },
    <PeopleFilter>{ gender: 'Female' }
  ];

  public activeFilters: PeopleFilter[] = [];

  public itemsAfterFilter(): People[] {
    return this.items.filter((item: People) => {
      const matchesActiveFilter: boolean = this.activeFilters.reduce((prev, curr) => {
        //if (item.gender.includes(curr.gender)) {
        //  return prev && true;
        //} else {
        //  return false;
        //}
        return true;
      }, true);

      return matchesActiveFilter;
    });
  }

  getPeoples() {
    debugger;
    this._PeopleService.getPeoples().subscribe(
      data => this.PeopleList = data
    )
    debugger;
    console.log(this.PeopleList);

  }
}
