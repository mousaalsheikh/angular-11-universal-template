import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  webPage:any = {};
  settings:any = {};
  htmlContent:any;
  id:number = -1;
  item:any = {};
  services = [];
  packages = [];
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
    this.getContactInfo();
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
  
  getData(){
    this.service.getCategory(this.id).then(resp => {        
      let title:string = (this.lang == 'en' ? 'ADEED Medical Services' : 'عضيد للخدمات الطبية');
      this.item = resp.category[0];
      let all = resp.packages;
      this.services = all.filter(function(el){
        return el.PackageType != 2
      });
      this.packages = all.filter(function(el){
        return el.PackageType == 2
      });    
      this.pageTitle.setTitle(this.item['CatName_' + this.lang] + ' | ' + title);          
      this.metaTagService.addTags([
        { name: 'keywords', content: this.item['CatName_' + this.lang] + ', ' + title},
        { name: 'description', content: this.item['CatName_' + this.lang] + ', ' + title },
        { name: 'og:title', content: this.item['CatName_' + this.lang] + ', ' + title },
        { name: 'og:description', content: this.item['CatName_' + this.lang] + ', ' + title },
        { name: 'og:site_name', content: config.meta.siteName },
        { name: 'og:type', content: 'Website' },
        { name: 'og:image', content: this.utils.getImage(this.item._Photo, 1200, 630)},
        { name: 'og:url', content: config.meta.siteUrl + this.router.url },
      ]);       
    });
  }
}
