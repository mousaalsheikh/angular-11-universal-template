import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';
import { ServicesComponent } from './pages/services/services.component';
import { PartnersAccrComponent } from './pages/partners/partners.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: LandingComponent },
  { path: ':lang/template', component: TemplateComponent },
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/page/:id', component: PageComponent },
  { path: ':lang/services', component: ServicesComponent },
  { path: ':lang/accreditations-and-partnership', component: PartnersAccrComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

