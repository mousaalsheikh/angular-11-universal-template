import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  settings:any = {};
  year:number = 2022;

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
      this.year = new Date().getFullYear();      
    }   
  }
}
