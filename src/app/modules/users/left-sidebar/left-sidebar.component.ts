import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
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
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
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
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
