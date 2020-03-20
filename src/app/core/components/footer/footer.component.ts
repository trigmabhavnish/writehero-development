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
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isProfileUpdated: boolean = false;
  profileSubscription: Subscription;
  profileDetails: any;
  isLoggedin: boolean = false;
  loginSubscription: Subscription;
  userName:string = '';
  userEmail:string = '';
  userRegDate:any = '';

  constructor(private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {

    

    // Page Refresh
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedin = true;

      this.profileSubscription = this.userAuthService.getUpdatedProfileStatus().subscribe((profileStatus) => {
        this.isProfileUpdated = profileStatus.profileUpdatedStatus;
        this.getUserDetails();
  
      });
      this.getUserDetails();

    }

    this.loginSubscription = this.userAuthService.checkLoggedinStatus().subscribe((loginStatus) => {
      this.isLoggedin = loginStatus.isLoggedIn;
      this.getUserDetails();
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
        this.userName = res.profile[0].first_name + ' ' + res.profile[0].last_name;
        this.userEmail = res.profile[0].email;
        this.userRegDate = this.toTimestamp(res.profile[0].reg_date)
        //console.log(this.profileDetails);
        //console.log(this.userRegDate);
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }

  public toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
