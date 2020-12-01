import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { config } from '../config';

@Injectable()
export class Api {
  public _routeParams: any;

  constructor(private http: HttpClient) { }

  async get(apiName, data?, url?, headers?): Promise<any> {
    return this._get(apiName, data, url, headers).toPromise();
  }

  async post(apiName, data?, url?, headers?): Promise<any> {
    return this._post(apiName, data, url, headers).toPromise();
  }

  async put(apiName, data?, url?, headers?): Promise<any> {
    return this._put(apiName, data, url, headers).toPromise();
  }

  async delete(apiName, data?, url?, headers?): Promise<any> {
    return this._delete(apiName, data, url, headers).toPromise();
  }

  private _get(apiName, data?, url?, customHeaders?) {
    let _headers;
    _headers = this.getHeaders(customHeaders);
    let headers = new HttpHeaders(_headers);
    let callUrl = '';
    if (apiName) {
      callUrl = config.apiUrl + apiName;
    } else {
      callUrl = url;
    }
    if (data) {
      data = '?' + data;
      callUrl = callUrl + data;
    }
    return this.http.get(callUrl, {
      headers: headers
    });
  }

  private _post(apiName, data, url?, customHeaders?) {
    let callUrl = '';
    if (apiName) {
      callUrl = config.apiUrl + apiName;
    } else {
      callUrl = url;
    }
    let _headers = this.getHeaders(customHeaders);
    let _data = {};
    if (data) _data = data;
    let headers = new HttpHeaders(_headers);
    return this.http.post(callUrl, JSON.stringify(_data), {
      headers: headers
    });
  }

  private _put(apiName, data, url?, customHeaders?) {
    let callUrl = '';
    if (apiName) {
      callUrl = config.apiUrl + apiName;
    } else {
      callUrl = url;
    }
    let _headers = this.getHeaders(customHeaders);
    let _data = {};
    if (data) _data = data;
    let headers = new HttpHeaders(_headers);
    return this.http.put(callUrl, JSON.stringify(_data), {
      headers: headers
    });
  }

  private _delete(apiName, data, url?, customHeaders?) {
    let _headers = this.getHeaders();
    let headers = new HttpHeaders(_headers);
    let callUrl = '';
    if (apiName) {
      callUrl = config.apiUrl + apiName;
    } else {
      callUrl = url;
    }
    return this.http.delete(callUrl, {
      headers: headers
    });
  }

  getHeaders(customHeaders?) {
    let _headers = {
      'Content-Type': 'application/json'
    };
    if (customHeaders) {
      let customHeaderKeys = Object.keys(customHeaders);
      for (var i = 0; i < customHeaderKeys.length; i++) {
        _headers[customHeaderKeys[i]] = customHeaders[customHeaderKeys[i]];
      }
    }
    return _headers;
  }
}
