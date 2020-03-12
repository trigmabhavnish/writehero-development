import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
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
//import services
import {
  AuthService as AuthS,
  FacebookLoginProvider
} from 'angular-6-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginSubmitted = false;
  hide = true;

  constructor(private authService: AuthS, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
    // if User Logged In then redirect to Dashboard Page
    this.userAuthService.checkLoginAndRedirect();

    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  validateLoginForm(): void {

    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    this.userAuthService.userLogin(this.loginForm.value).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.commonUtilsService.onSuccess(res.body.response);
        localStorage.setItem('x-auth-token', res.headers.get('x-auth-token'));
        localStorage.setItem('account_type', res.body.accountType);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        this.userAuthService.isLoggedIn(true, res.accountType); //trigger loggedin observable 
        this.router.navigate(['/user/dashboard']);
        //case error 
      }, error => {
        this.commonUtilsService.onError((error.response) ? error.response : environment.MESSAGES.VALIDATION_ERROR);
      });
  }


  signInWithFB(): void {


    let self = this;
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (userData: any) => {
        let user_name = this.commonUtilsService.generateUsername(userData.email);
        let loginObj = {
          email: userData.email,
          first_name: userData.name.split(" ")[0],
          last_name: userData.name.split(" ")[1],
          director_id: 3,
          status: 'Y',
          password: '435345HSFSDFRFTR#$',
          user_name: user_name
        }
        this.userAuthService.loginWithFb(loginObj).pipe(untilDestroyed(this)).subscribe(
          //case success
          (res) => {
            this.commonUtilsService.onSuccess(res.body.response);
            localStorage.setItem('x-auth-token', res.headers.get('x-auth-token'));
            localStorage.setItem('account_type', res.body.accountType);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            this.userAuthService.isLoggedIn(true, res.accountType); //trigger loggedin observable 
            this.router.navigate(['/user/dashboard']);
            //case error 
          }, error => {
            this.commonUtilsService.onError((error.response) ? error.response : environment.MESSAGES.VALIDATION_ERROR);
          });


      }
    );

  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
