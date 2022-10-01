import { Component, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import * as $ from 'jquery';
import { config } from './config';
import { Utils } from './classes/utils';
declare let addDataLayer: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  lang:string = '';
  isBrowser: boolean = false;
  os:string = 'server';

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if(this.isBrowser){
      let userAgent = navigator.userAgent.toLowerCase();
      this.os = (userAgent.indexOf('ios') == -1 ? 'not-ios' : 'ios');
      let self = this;
      // window['_addDataLayer'] = function(obj){
      //   self._addDataLayer(obj);
      // }
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.isBrowser) {
        $('body').removeClass('mobile-menu-expanded'); 
        window.scrollTo(0, 0);    
        $('html, body').animate({
          scrollTop: 0
        }, 200);  
        setTimeout(() => {
          window.scrollTo(0, 0);    
          $('html, body').animate({
            scrollTop: 0
          }, 200);  
        }, 100);
      }
    });
    this.router.events.subscribe((url: NavigationEnd) => {
      if (url && url.urlAfterRedirects) {
        this.lang = this.utils.getLanguage();
        if (this.isBrowser) {          
        }        
      }
      return;
    });
  }

  toggleMobileMenu(){
    if(this.isBrowser){
      //$('body').removeClass('mobile-menu-expanded');      
    }
  }

  _addDataLayer(obj){
    try {
        //if(this.isBrowser) addDataLayer(obj);
        console.log('event', obj);
    } catch {}
  }
}
