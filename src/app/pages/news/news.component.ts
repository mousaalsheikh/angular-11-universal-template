import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  webPage:any = {};
  htmlContent:any;
  item:any = {};
  news = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils,
    private metaTagService: Meta,
    private pageTitle: Title,
    private service: SharedService,
    private sanitizer: DomSanitizer) {
      this.isBrowser = this.utils.isBrowser();
      this.lang = this.utils.getLanguage();
   }

  ngOnInit(): void {
    this.getMetaTags('news');
    this.getData();
  }

  getData(){
    this.service.getNews().then(resp => {
      if(resp.data.news.length > 0){
        this.item = resp.data.news[0];
        this.news = resp.data.news.filter(function(el){
          return el.NewsID != resp.data.news[0].NewsID
        });    
      }       
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
}
