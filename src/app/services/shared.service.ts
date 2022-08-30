import { Injectable } from '@angular/core';
import { config } from '../config';
import { Api } from '../http/Api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  controller:string = 'Shared';

  constructor(private api: Api) { }

  getWebPage(id) {
    return this.api.get(`${this.controller}/meta?id=${id}`);
  }

  getSection(id) {
    return this.api.get(`${this.controller}/section?id=${id}`);
  }

  getSettings() {
    return this.api.get(`${this.controller}/settings`);
  }

  getSlider() {
    return this.api.get(`${this.controller}/slider`);
  }

  getSpecial() {
    return this.api.get(`${this.controller}/get-special`);
  }

  getHomeCategories(){
    return this.api.get('', '', config.bookingsApiUrl + `/get-home-categories`);
  }

  getPartners() {
    return this.api.get(`${this.controller}/get-partners`);
  }

  getBackfack() {
    return this.api.get(`${this.controller}/get-feedback`);
  }
}
