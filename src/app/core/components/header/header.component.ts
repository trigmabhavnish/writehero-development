import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { UsersService, CommonUtilsService } from '../../../core/_services';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin: boolean = false;
  loginSubscription: Subscription;
  isHomeUrl:boolean =false;
  constructor( private router: Router, private userAuthService: UsersService, private toastr: ToastrManager, private commonUtilsService: CommonUtilsService) { }

  ngOnInit() {

    // Page Refresh
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedin = true;
    }
    this.router.events
    .subscribe(() => {
     this.isHomeUrl = this.router.routerState.snapshot.url.includes('web');
    })
    // console.log('the',this.location.href)
    this.loginSubscription = this.userAuthService.checkLoggedinStatus().subscribe((loginStatus) => {
      this.isLoggedin = loginStatus.isLoggedIn;
    });

    
  }

}
