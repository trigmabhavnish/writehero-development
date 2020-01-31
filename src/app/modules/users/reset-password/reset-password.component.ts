import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed

import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { UsersService, CommonUtilsService } from '../../../core/_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  verifyToken: any;
  tokenVerified: boolean = false;
  forgotPasswordForm: FormGroup;
  forgotPasswordSubmitted = false;
  constructor(private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // if User Logged In then redirect to Dashboard Page
    this.userAuthService.checkLoginAndRedirect();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.verifyToken = params['token'];
      this.verifyAuthToken(this.verifyToken);
    })
  }


  private buildForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      myRecaptcha: [false]
    });
  }

  /**
   * Submit Forgot Password.
   * return object array 
   */
  validateForgotPasswordForm(): void {

    this.forgotPasswordSubmitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    this.userAuthService.userForgotPassword(this.forgotPasswordForm.value).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.forgotPasswordSubmitted = false;
        this.commonUtilsService.onSuccess(res.response);
        this.router.navigate(['/user/login']);
        //case error 
      }, error => {
        this.forgotPasswordSubmitted = false;
        this.commonUtilsService.onError(error.response);
      });
  }


  /**
   * Verify Token Valid or not
   * return boolean 
   */
  private verifyAuthToken(verifyToken) {
    this.userAuthService.userVerifyAuthToken({ verifyToken: verifyToken }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        //case error 
        if (res.response) {
          this.tokenVerified = true;
        } else {
          this.tokenVerified = false;
          this.commonUtilsService.onError(environment.MESSAGES.FAILED_TO_VERIFY);
          this.router.navigate(['/user/forgot-password']);
        }

      }, error => {
        this.commonUtilsService.onError(error.response);
        this.tokenVerified = false;
        this.router.navigate(['/user/forgot-password']);
      });
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
