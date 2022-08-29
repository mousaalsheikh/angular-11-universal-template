import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { config } from '../../config';
import { Swiper, EffectFade } from 'swiper';

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
  swiper:any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils) {
      this.isBrowser = this.utils.isBrowser();
      this.lang = this.utils.getLanguage();
   }

  ngOnInit(): void {
    if(this.isBrowser){
      Swiper.use([EffectFade]);
      this.swiper = new Swiper('.swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        effect: 'fade',
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },        
      });      
      setInterval(() => {
        if(this.swiper.activeIndex == this.slides.length - 1){
          this.swiper.slideTo(0);
        } else {
          this.swiper.slideNext();
        }        
      }, 1000 * this.seconds);
    }    
  }

  doNext(){
    if(this.swiper.activeIndex == this.slides.length - 1){
      this.swiper.slideTo(0);
    } else {
      this.swiper.slideNext();
    }        
  }

  doPrev(){
    this.swiper.slidePrev();
  }
}
