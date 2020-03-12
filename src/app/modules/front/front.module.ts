import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {RatingModule} from "ngx-rating";
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
const routes: Routes = [
  { path: '', component: HomeComponent,data: { title: 'Home' }},
  { path: 'terms-conditions', component: TermsConditionsComponent,data: { title: 'Terms' }} ,
  { path: 'privacy-policy', component: PrivacyPolicyComponent,data: { title: 'Privacy' } } 
];

@NgModule({
  declarations: [HomeComponent, TermsConditionsComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    RatingModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontModule { }
