import { ChangeDetectionStrategy, Component, Input, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'spa-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


@Injectable()
export class PeopleComponent implements OnInit{
  @Input()
  public id: number = 0;
  @Input()
  public firstname: string = "";
  @Input()
  public gender: string = "";

  ngOnInit(): void {
    console.log(this.id);
    console.log(this.firstname);
    console.log(this.gender);
  }
 

  public getProfilePicture(): string {
    return 'USD';
  }
}
