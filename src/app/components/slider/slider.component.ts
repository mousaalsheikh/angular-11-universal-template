import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { config } from '../../config';
import { Swiper, EffectFade, Autoplay, Navigation } from 'swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  @Input('slides') slides = [];
  seconds:number = 10;
  lang:string = '';
  isBrowser:boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) {
      this.isBrowser = this.utils.isBrowser();
      this.lang = this.utils.getLanguage();
   }

  ngOnInit(): void {
    if(this.isBrowser){
      this.setupSwiper();
      setTimeout(() => {
         this.setupSwiper();
      }, 1000);         
    }    
  }

  setupSwiper(){
    Swiper.use([EffectFade]);
    Swiper.use([Autoplay]);
    Swiper.use([Navigation]);
    const swiper = new Swiper('.main-swiper', {
          spaceBetween: 0,
          slidesPerView: 1,
          effect: 'fade',
          loop: true, 
          loopedSlides: 100,
          autoplay: {
            delay: this.seconds * 1000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },     
    });  
  }
}
