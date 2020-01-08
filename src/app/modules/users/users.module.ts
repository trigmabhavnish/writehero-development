import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module'; // Shared Module
import { RecaptchaModule } from 'angular-google-recaptcha'; // Google Recaptcha Module


import { UsersRoutingModule } from './users-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../../../environments/environment'

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RecaptchaModule.forRoot({
        siteKey: environment.GOOGLE_RECAPTCHA_SITE_KEY,
    })
  ]
})
export class UsersModule { }
