import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { config } from '../../config';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  data = '';
  isBorwser: boolean;

  constructor(private service: SharedService, @Inject(PLATFORM_ID) private platformID: Object,
    private metaTagService: Meta,
    private pageTitle: Title,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.isBorwser = isPlatformBrowser(this.platformID);
  }

  ngOnInit() {
    this.getMetaTags();
    this.service.getData().then(data => {
      this.data = JSON.stringify(data);
    });
  }

  getMetaTags() {
    this.pageTitle.setTitle(config.meta.siteName);
    this.metaTagService.addTags([
      { name: 'keywords', content: config.meta.keywords },
      { name: 'description', content: config.meta.description },
      { name: 'og:title', content: config.meta.og_title },
      { name: 'og:description', content: config.meta.og_description },
      { name: 'og:site_name', content: config.meta.siteName },
      { name: 'og:type', content: 'Website' },
      { name: 'og:image', content: config.meta.og_image },
      { name: 'og:url', content: config.meta.siteUrl + this.router.url },
    ]);
  }
}
