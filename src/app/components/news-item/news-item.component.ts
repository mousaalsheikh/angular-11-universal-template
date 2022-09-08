import { Component, OnInit, Input } from '@angular/core';
import { Utils } from '../../classes/utils';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.less']
})
export class NewsItemComponent implements OnInit {

  @Input('item') item:any = {};
  @Input('lang') lang:string = '';

  constructor(public utils: Utils) { }

  ngOnInit(): void {
  }  
}
