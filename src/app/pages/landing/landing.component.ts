import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { config } from '../../config';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

  isBrowser:boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) { 
      this.isBrowser = this.utils.isBrowser();
    }

  ngOnInit(): void {
    let language = config.defaultLanguage;
    if(this.isBrowser){
      if(localStorage.lang){
        language = localStorage.lang;
      }
    }
    this.router.navigate([`/${language}/home`]);
  }
}
