import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { config } from '../../config';
import { Swiper, EffectFade, Autoplay, Navigation } from 'swiper';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.less']
})
export class PartnersComponent implements OnInit {

  @Input('partners') partners = [];
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
      setTimeout(() => {
        Swiper.use([Autoplay]);
        Swiper.use([Navigation]);      
        const swiper = new Swiper(".partners-swiper", {
          spaceBetween: 0,
          slidesPerView: 1,        
          loop: true,
          autoplay: {
            delay: this.seconds * 1000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          loopedSlides: 100,
          breakpoints: {
            575: {
              slidesPerView: 2,
            },
            650: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            }
          }
        });       
      }, 100); 
    }    
  }

  getLogo(logo){
    return `https://ucarecdn.com/${logo}/-/preview/240x90/-/setfill/ffffff/-/crop/300x150/center/`;
  }
}
