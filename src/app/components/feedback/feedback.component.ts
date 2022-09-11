import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { config } from '../../config';
import { Swiper, EffectFade, Autoplay, Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.less']
})
export class FeedbackComponent implements OnInit {

  @Input('feedback') feedback = [];
  seconds:number = 4;
  lang:string = '';
  isBrowser:boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) {
      this.isBrowser = this.utils.isBrowser();
      this.lang = this.utils.getLanguage();
   }

  ngOnInit(): void {
    if(this.isBrowser){    
      Swiper.use([Pagination]);      
      const swiper = new Swiper(".feedback-swiper", {
        spaceBetween: 0,
        slidesPerView: 1,       
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
      });   
    }    
  }
}
