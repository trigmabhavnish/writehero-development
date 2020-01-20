import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class

// import environment
import { environment } from '../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../app/shared/_services'

//import core services
import { UsersService, CommonUtilsService } from '../app/core/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'write-hero';

  isLoggedin: boolean = false;
  loginSubscription: Subscription;

  constructor(private router: Router, private userAuthService: UsersService, private toastr: ToastrManager, private commonUtilsService: CommonUtilsService) { }

  ngOnInit() {

    // Page Refresh
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedin = true;
    }

    this.loginSubscription = this.userAuthService.checkLoggedinStatus().subscribe((loginStatus) => {
      this.isLoggedin = loginStatus.isLoggedIn;
    });

    
  }
}
