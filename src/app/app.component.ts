import { Component, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import * as $ from 'jquery';
import { config } from './config';
import { Utils } from './classes/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  lang:string = '';
  isBorwser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) {
    this.isBorwser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.isBorwser) window.scrollTo(0, 0);      
    });
    this.router.events.subscribe((url: NavigationEnd) => {
      if (url && url.urlAfterRedirects) {
        this.lang = this.utils.getLanguage();
        if (this.isBorwser) {          
        }        
      }
      return;
    });
  }
}
