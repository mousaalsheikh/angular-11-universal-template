import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  settings:any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils,
    private metaTagService: Meta,
    private pageTitle: Title,
    private service: SharedService,
    private sanitizer: DomSanitizer) {
      this.isBrowser = this.utils.isBrowser();
      this.router.events.subscribe((url: NavigationEnd) => {
        if (url && url.urlAfterRedirects) {
          this.lang = this.utils.getLanguage();       
        }
        return;
      });     
   }

  ngOnInit(): void {
    if(this.isBrowser){
      if(localStorage.settings){
        this.settings = JSON.parse(localStorage.setting);
      }
    }
    this.service.getSettings().then(resp => { 
      this.settings = resp.data.settings[0];
      if(this.isBrowser) localStorage.setting = JSON.stringify(this.settings);
    });
  }

  toggleMobileMenu(){
    if(this.isBrowser){
      $('body').addClass('mobile-menu-expanded');
      $('body').addClass('menu-lang-' + this.lang);
    }
  }

  changeLanguage(){
    if(this.isBrowser){
      localStorage.lang = (this.lang == 'ar' ? 'en' : 'ar');
    }
  }
}
