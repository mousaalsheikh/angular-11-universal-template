import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  webPage:any = {};
  settings:any = {};
  htmlContent:any;
  id:number = -1;
  item:any = {};

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
          if (params['id']) this.id = +params['id']; 
          this.getData();                     
        }
      });    
   }

  ngOnInit(): void {   
   
  }
  
  getData(){
    this.service.getPost(this.id).then(resp => {
      let title:string = (this.lang == 'en' ? 'ADEED News' : 'أخبار عضيد');
      this.item = resp.data.post[0];
      this.pageTitle.setTitle(this.item['NewsTitle_' + this.lang] + ' | ' + title);    
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.item['NewsContent_' + this.lang]);
      this.metaTagService.addTags([
        { name: 'keywords', content: this.item['NewsTitle_' + this.lang] + ', ' + title},
        { name: 'description', content: this.item['NewsTitle_' + this.lang] + ', ' + title },
        { name: 'og:title', content: this.item['NewsTitle_' + this.lang] + ', ' + title },
        { name: 'og:description', content: this.item['NewsTitle_' + this.lang] + ', ' + title },
        { name: 'og:site_name', content: config.meta.siteName },
        { name: 'og:type', content: 'Website' },
        { name: 'og:image', content: this.utils.getImage(this.item.NewsPhoto, 1200, 630)},
        { name: 'og:url', content: config.meta.siteUrl + this.router.url },
      ]);       
    });
  }
}
