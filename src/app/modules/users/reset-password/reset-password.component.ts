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
  fetchUserId: any;
  tokenVerified: boolean = false;
  resetPasswordForm: FormGroup;
  resetPasswordSubmitted = false;
  constructor(private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // if User Logged In then redirect to Dashboard Page
    this.userAuthService.checkLoginAndRedirect();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.verifyToken = params['token'];
      this.verifyAuthToken(this.verifyToken);      
    });

    this.buildResetPasswordForm(); // if verify then build reset password form
    
  }


  private buildResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        /*// check whether the entered password has a number
        CustomValidator.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidator.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidator.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidator.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        )*/
      ])
      ],
      confirm_password: ['', Validators.required],
      user_id: ['']
    }, {
      validator: CustomValidator.MustMatch('password', 'confirm_password')
    });
  }

  /**
   * Submit Reset Password.
   * return object array 
   */
  validateResetPasswordForm(): void {

    this.resetPasswordSubmitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    // Update User Id in Form Control
    this.resetPasswordForm.controls.user_id.patchValue(this.fetchUserId);

    this.userAuthService.userResetPassword(this.resetPasswordForm.value).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.resetPasswordSubmitted = false;
        this.commonUtilsService.onSuccess(res.response);
        this.router.navigate(['/user/login']);
        //case error 
      }, error => {
        this.resetPasswordSubmitted = false;
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
          this.fetchUserId = res.user_id;
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
