import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.less']
})
export class SectionComponent implements OnInit {

  @Input('sectionId') sectionId:string = '';
  lang:string = '';
  isBrowser:boolean;
  section:any = {};
  htmlContent_en:any;
  htmlContent_ar:any;

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
    this.service.getSection(this.sectionId).then(resp => {
      this.lang = this.utils.getLanguage();      
      this.section = resp.data.section[0];
      this.htmlContent_en = this.sanitizer.bypassSecurityTrustHtml(this.section.SectionContent_en);
      this.htmlContent_ar = this.sanitizer.bypassSecurityTrustHtml(this.section.SectionContent_ar);
    });
  }
}
