import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Utils } from '../../classes/utils';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../../services/shared.service';
import { config } from '../../config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  lang:string = '';
  isBrowser:boolean;
  msg:any = {
    SenderName: '',
    PhoneNumber: '',
    SenderEmail: '',
    MessagSubject: '',
    MessageBody: ''        
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public utils: Utils,
    private metaTagService: Meta,
    private pageTitle: Title,
    private service: SharedService,
    private sanitizer: DomSanitizer) {
      this.isBrowser = this.utils.isBrowser();
      this.router.events.subscribe((url: NavigationEnd) => {
        if (url && url.urlAfterRedirects) {
          this.lang = this.utils.getLanguage();       
        }
        return;
      });     
   }

  ngOnInit(): void {
  }

  sendMessage(){
    let isValid:boolean = true;
    if(this.msg.SenderName && this.msg.PhoneNumber && this.msg.MessagSubject && this.msg.MessageBody){
      const reg = new RegExp('^[0-9]+$');
      let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!reg.test(this.msg.PhoneNumber) || this.msg.PhoneNumber.length < 10){
        alert(this.utils.getString('invalidMobile'));
        isValid = false;
      }
      if(this.msg.SenderEmail){
        if(!regex.test(this.msg.SenderEmail)){
          alert(this.utils.getString('invalidEmail'));
          isValid = false;
        }
      }
      if(isValid){
        this.service.sendMessage(this.msg).then(resp => {
          this.msg = {
            SenderName: '',
            PhoneNumber: '',
            SenderEmail: '',
            MessagSubject: '',
            MessageBody: ''        
          };
          this.tagEvent();
          alert(this.utils.getString('thanks'));
        })        
      }
    } else {
      alert(this.utils.getString('requiredRegistrationFields'));
    }
  }

  tagEvent(){
    if(this.isBrowser) {
      window['_addDataLayer']({
        'event': 'send_contact_message'
      });
    }
  }
}
