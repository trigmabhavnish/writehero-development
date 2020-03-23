import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
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
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  isProfileUpdated: boolean = false;
  profileSubscription: Subscription;
  profileDetails:any;
  notificationCount:any;
  defaultPath = environment.DEFAULT_PROFILE_PIC;

  loginSubscription: Subscription;

  isLoggedin: boolean = false;

  constructor(private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { 
    this.loadScripts()
  }

  ngOnInit() {

    this.profileSubscription = this.userAuthService.getUpdatedProfileStatus().subscribe((profileStatus) => {
      this.isProfileUpdated = profileStatus.profileUpdatedStatus;
      this.getUserDetails();
      this.getNotificationCount();
    });

    // Page Refresh
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedin = true;
    }

    this.loginSubscription = this.userAuthService.checkLoggedinStatus().subscribe((loginStatus) => {
      this.isLoggedin = loginStatus.isLoggedIn;
    });

    // On Page Refresh
    this.getUserDetails();
    this.getNotificationCount();
    
  }

  /*
    Logout User
  */
  public logout() {
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    this.userAuthService.userLogout({ auth_token: localStorage.getItem('x-auth-token') }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.commonUtilsService.onSuccess(res.response);
        localStorage.removeItem('x-auth-token');
        localStorage.removeItem('account_type');
        localStorage.removeItem('isLoggedIn');
        localStorage.clear();
        this.userAuthService.isLoggedIn(false, ''); //trigger loggedin observable 
        this.router.navigate(['/user/login']);

        /* Update Intercom */
        (<any>window).Intercom('shutdown');
        (<any>window).Intercom('boot', {
          app_id: "joro9d7f",
        });
        /* Update Intercom */
        
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }

  /*
    get Logged In User Details
  */
  public getUserDetails() {
    this.userAuthService.getUserProfile().pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.profileDetails = res.profile[0];       
        //console.log(this.profileDetails);
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }


 private getNotificationCount(){
  this.userAuthService.getUserNotificationsCount().pipe(untilDestroyed(this)).subscribe(
    //case success
    (res) => {
            this.notificationCount = res.count[0].totalItem
    }, error => {
      this.commonUtilsService.onError(error.response);
    });
 }

 public viewNotification():void{
   this.router.navigate(['/user/notifications'])
 }


 loadScripts() {
  const dynamicScripts = [     
   'assets/js/app.js'
  ];
  for (let i = 0; i < dynamicScripts.length; i++) {
    const node = document.createElement('script');
    node.src = dynamicScripts[i];
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
