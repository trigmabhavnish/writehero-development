import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module'; // Shared Module
import { RecaptchaModule } from 'angular-google-recaptcha'; // Google Recaptcha Module

import { ArchwizardModule } from 'angular-archwizard';

import { UsersRoutingModule } from './users-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../../../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { CustomWizardComponent } from './custom-wizard/custom-wizard.component';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgxPayPalModule } from 'ngx-paypal';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TicketListingComponent } from './support/ticket-listing/ticket-listing.component';
import { CreateTicketComponent } from './support/create-ticket/create-ticket.component';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  acceptedFiles: '.jpg, .png, .jpeg, .pdf',
  createImageThumbnails: true
};

@NgModule({
  declarations: [SignupComponent, LoginComponent, DashboardComponent, LeftSidebarComponent, AddNewProjectComponent, CustomWizardComponent, BuyCreditsComponent, ForgotPasswordComponent, ResetPasswordComponent, TicketListingComponent, CreateTicketComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ArchwizardModule,
    DropzoneModule,
    NgxPayPalModule,
    RecaptchaModule.forRoot({
        siteKey: environment.GOOGLE_RECAPTCHA_SITE_KEY,
    })
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class UsersModule { }
