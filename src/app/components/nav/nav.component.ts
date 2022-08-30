import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  @Input('layout') layout:string = '';
  lang:string = '';
  isBrowser:boolean;
  settings:any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils,
    private service: SharedService) {
      this.isBrowser = this.utils.isBrowser();
      this.router.events.subscribe((url: NavigationEnd) => {
        if (url && url.urlAfterRedirects) {
          this.lang = this.utils.getLanguage();       
        }
        return;
      });          
   }

  ngOnInit(): void {
    
  }

  goToPartners(){
    if(this.isBrowser){
      $('html, body').animate({
        scrollTop: $("#partners").offset().top
      }, 1000);
      $('body').removeClass('mobile-menu-expanded');      
    }
  }
}
