import { Injectable } from '@angular/core';
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

  getSettings() {
    return this.api.get(`${this.controller}/settings`);
  }

  getSlider() {
    return this.api.get(`${this.controller}/slider`);
  }
}
