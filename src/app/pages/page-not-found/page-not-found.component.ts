import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  webPage:any = {};
  htmlContent:any;

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
    this.getMetaTags('404');
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
