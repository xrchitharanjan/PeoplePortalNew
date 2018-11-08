import { Directive, ChangeDetectionStrategy, Component, Input, OnInit, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'spa-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})


@Injectable()
export class NewsComponent implements OnInit {


  public errorMessage: any;
  ngOnInit(): void {

  }

  constructor(private sanitizer: DomSanitizer) {

  }


}
