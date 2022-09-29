import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { InitComponent } from './pages/init/init.component';
import { PageComponent } from './pages/page/page.component';
import { ServicesComponent } from './pages/services/services.component';
import { PartnersAccrComponent } from './pages/partners/partners.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NewsComponent } from './pages/news/news.component';
import { CareersComponent } from './pages/careers/careers.component';
import { PostComponent } from './pages/post/post.component';
import { CategoryComponent } from './pages/category/category.component';
import { ViewAppointmentsComponent } from './pages/view-appointments/view-appointments.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: LandingComponent },
  { path: ':lang/template', component: TemplateComponent },
  { path: ':lang/home', component: HomeComponent },
  // { path: ':lang/home-2', component: StartComponent },
  // { path: ':lang/home-3', component: InitComponent },
  { path: ':lang/page/:id', component: PageComponent },
  { path: ':lang/services', component: ServicesComponent },
  { path: ':lang/category/:id', component: CategoryComponent },
  { path: ':lang/accreditations-and-partnership', component: PartnersAccrComponent },
  { path: ':lang/news', component: NewsComponent },
  { path: ':lang/news/post/:id', component: PostComponent },
  { path: ':lang/careers', component: CareersComponent },
  { path: 'v-prov-apts: ', component: ViewAppointmentsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

