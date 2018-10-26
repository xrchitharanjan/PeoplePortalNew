import { ChangeDetectionStrategy, Component, Input, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'spa-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


@Injectable()
export class PeopleComponent implements OnInit{

  ngOnInit(): void {
  }
  @Input()
  public id: number = 0;
  @Input()
  public firstname: string = "";
  @Input()
  public gender: string = "";

  public getProfilePicture(): string {
    return 'USD';
  }
}
