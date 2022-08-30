import { Injectable, Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { resx } from '../resx';

@Injectable()
export class Utils {

    loginObserver = new BehaviorSubject<boolean>(this._isLoggedIn());
    currencyObserver = new BehaviorSubject<string>(this._currencyValue());
    profileObserver = new BehaviorSubject<string>(this._profileValue());

    constructor(@Inject(PLATFORM_ID) private platformID: Object,
    private router: Router, private activatedRoute: ActivatedRoute) {

    }

    config(key){
        return config[key];
    }

    public getString(key, lang?) {
        lang = (lang ? lang : this.getLanguage());
        let value = (resx[key] ? (resx[key][lang] ? resx[key][lang] : key) : key);
        return value;
    }

    isBrowser():boolean{
        return isPlatformBrowser(this.platformID);
    }

    getLanguage():string{   
        if (this.router.url.indexOf('/en/') != -1) {
            return 'en';
        } else {
            return 'ar';
        }
    }

    isHome():boolean{   
        if (this.router.url.indexOf('/en/home') != -1 || this.router.url.indexOf('/ar/home') != -1) {
            return true;
        } else {
            return false;
        }
    }

    alt():string{
        return 'Adeed - عضيد';
    }

    changeUrl():string{
        let url = this.router.url;
        let lang = this.getLanguage();
        if(this.getLanguage() == 'en'){
            url = url.replace('/' + lang + '/', '/ar/');
        } else {
            url = url.replace('/' + lang + '/', '/en/');
        }
        return url;
    }

    _isLoggedIn() {
        if(this.isBrowser()){
            if(localStorage.user_id && localStorage.user_id != '00000000-0000-0000-0000-000000000000'){
                return true;
            }
        }        
        return false;
    }
    getUserId(){
        if(this.isBrowser()){
            if(localStorage.user_id && localStorage.user_id != '00000000-0000-0000-0000-000000000000'){
                return localStorage.user_id;
            } else {
                return '00000000-0000-0000-0000-000000000000';
            }
        } else {
            return '00000000-0000-0000-0000-000000000000';
        }
    }

    _currencyValue():string {        
        if(this.isBrowser()){
            return (localStorage.currency ? localStorage.currency : 'USD');
        } else {
            return 'USD';
        }
    }
    _profileValue():string {        
        return (this.isBrowser() ? localStorage.user_id : '00000000-0000-0000-0000-000000000000');
    }

    doLogin(uid): void {
        if(this.isBrowser()) localStorage.setItem('user_id', uid);
        this.loginObserver.next(true);
    }
    doLogout(): void {
        if(this.isBrowser()) {
            localStorage.removeItem('user_id');
            localStorage.removeItem('userToken');
            localStorage.removeItem('IsSeller');
            localStorage.removeItem('ProfilePhoto');
            localStorage.removeItem('FirstName');
            localStorage.removeItem('mode');
        }        
        this.loginObserver.next(false);
    }

    forceLogout(): void {
        if(this.isBrowser()) {
            localStorage.removeItem('user_id');
            localStorage.removeItem('userToken');
            localStorage.removeItem('IsSeller');
            localStorage.removeItem('ProfilePhoto');
            localStorage.removeItem('FirstName');
            localStorage.removeItem('mode');
        }        
    }

    changeCurrency(_cur): void {
        if(this.isBrowser()) localStorage.currency = _cur;
        this.currencyObserver.next(_cur);
    }

    updateProfile(){
        this.profileObserver.next(this.getUUID());
    }

    isLoggedIn(): Observable<boolean> {
        return this.loginObserver.asObservable();
    }

    currencyChanged(): Observable<string> {
        return this.currencyObserver.asObservable();
    }

    profileUpdated(): Observable<string> {
        return this.profileObserver.asObservable();
    }

    public getFile(id:string): string {
        return `https://ucarecdn.com/${id}/`;
    }

    public getImage(id:string, w = 1024, h = 768): string {        
        return `https://ucarecdn.com/${id}/-/scale_crop/${w}x${h}/smart/`;
    }

    public getLogo(){
        return config.logoUrl;
    }

    getUUID() {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    //warning, error, success, info, and question
    // alert(title, type?, text?){
    //     if(this.isBrowser()){
    //         if(!type) type = 'info';
    //         Swal.fire({
    //             title: title,
    //             text: (text ? text : ''),
    //             confirmButtonText: 'موافق',
    //             icon: type
    //         });
    //     }
    // }

    // success(title?, text?){
    //     if(this.isBrowser){
    //         if(!title) title = 'تم الحفظ بنجاح';
    //         Swal.fire({
    //             title: title,
    //             text: (text ? text : ''),
    //             confirmButtonText: 'موافق',
    //             timer: 1500,
    //             icon: 'success'
    //         });
    //     }
    // }
}
