import { BrowserModule, TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './http/interceptor/httpconfig.interceptor';
import { Utils } from './classes/utils';
import { Api } from './http/Api';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModuleModule } from './services-module.module';
import { MaterialModule } from './material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './pages/landing/landing.component';
import { TemplateComponent } from './pages/template/template.component';
import { PageComponent } from './pages/page/page.component';
import { SliderComponent } from './components/slider/slider.component';
import { SectionComponent } from './components/section/section.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavComponent } from './components/nav/nav.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PartnersAccrComponent } from './pages/partners/partners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LandingComponent,
    TemplateComponent,
    PageComponent,
    SliderComponent,
    SectionComponent,
    PartnersComponent,
    PageTitleComponent,
    FeedbackComponent,
    ContactComponent,
    NavComponent,
    ServicesComponent,
    ContactUsComponent,
    PartnersAccrComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    //BrowserTransferStateModule,
    ServicesModuleModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Api, Utils, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
