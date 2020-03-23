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

import * as AOS from 'aos';


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



    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      
    
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    
    });    

    
  }
}
