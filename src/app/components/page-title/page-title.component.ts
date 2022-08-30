import { Component, OnInit, Input } from '@angular/core';
import { Utils } from '../../classes/utils';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less']
})
export class PageTitleComponent implements OnInit {

  @Input('webPage') webPage:any = {};
  @Input('lang') lang:string = '';

  constructor(public utils: Utils) { }

  ngOnInit(): void {
  }
}
