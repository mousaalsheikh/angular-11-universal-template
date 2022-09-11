import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';
import * as $ from 'jquery';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  webPage:any = {};
  settings:any = {};
  pageId:string = '';
  htmlContent:any;
  isContact:boolean = false;
  faqs = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils,
    private metaTagService: Meta,
    private pageTitle: Title,
    private service: SharedService,
    private sanitizer: DomSanitizer) {
      this.isBrowser = this.utils.isBrowser();
      this.lang = this.utils.getLanguage();
      this.activatedRoute.params.subscribe(params => {
        if(params){
          if (params['id']) this.pageId = params['id'];   
          if(this.pageId == 'faq'){
            this.getFAQ();
          }
          if(this.pageId == 'contact-us' || this.pageId == 'for-corporate') {
            this.getContactInfo();
            this.isContact = true;
          } else {
            this.isContact = false;
          }
          this.getMetaTags(this.pageId);
        }
      });    
   }

  ngOnInit(): void {    
  }

  getContactInfo(){
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

  getFAQ(){
    this.service.getFAQ().then(data => {
      this.faqs = data.data.faq;
    });
  }

  getMetaTags(pageId) {
    this.service.getWebPage(pageId).then(data => {
      if(data.data.page.length > 0){
        this.webPage = data.data.page[0];        
        this.pageTitle.setTitle(this.webPage.pgTitle);        
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.webPage.PageContent);
         this.metaTagService.addTags([
           { name: 'keywords', content: this.webPage.ggKeywords },
           { name: 'description', content: this.webPage.ggDescription },
           { name: 'og:title', content: this.webPage.ogTitle },
           { name: 'og:description', content: this.webPage.ogDescription },
           { name: 'og:site_name', content: config.meta.siteName },
           { name: 'og:type', content: 'Website' },
           { name: 'og:image', content: (this.webPage.ogImage ? this.utils.getImage(this.webPage.ogImage, 1200, 630) : config.meta.og_image ) },
           { name: 'og:url', content: config.meta.siteUrl + this.router.url },
         ]);         
      } else {
        this.pageTitle.setTitle(config.meta.siteName);
      }      
    });     
  }

  toggleQuestion(i){
    if(this.isBrowser){
      let id = `[data-index="${i}"]`;
      $(id).toggleClass('expanded');
      $(id).find('.answer').slideToggle(200);
    }
  }
}
