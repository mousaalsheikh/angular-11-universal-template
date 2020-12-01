import { Injectable } from '@angular/core';
import { Api } from '../http/Api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private api: Api) { }

  getData() {
    return this.api.get('get-date');
  }
}
