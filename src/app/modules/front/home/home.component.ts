import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
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
import { UsersService, CommonUtilsService, FeedBackService } from '../../../core/_services';
import { OwlOptions } from 'ngx-owl-carousel-o';


declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private feedbackservice: FeedBackService, private toastr: ToastrManager, private router: Router) { }

  customOptions: OwlOptions = {
    margin: 20,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  }


  feedbacks: any = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalItems: number = 0
  defaultPath = environment.DEFAULT_PROFILE_PIC;

  ngOnInit() {
    // if User Logged In then redirect to Dashboard Page
    this.userAuthService.checkLoginAndRedirect();
    this.getFeedBackLsiting();
    this.userAuthService.scrollId.subscribe(response => {

      $('html, body').animate({
        scrollTop: $(`#${response.scrollId}`).offset().top
      }, 1000);
    })
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

  private getFeedBackLsiting(): void {

    this.feedbackservice.getFeedBackListing({ pageNumber: this.currentPage, pageSize: this.pageSize }).pipe(untilDestroyed(this)).subscribe(response => {
      this.feedbacks = response.feedback;
      console.log(response.feedback);
      //this.totalItems = response.totalItems;

    }, error => {

    })
  }

  ngAfterViewInit() {
    $(".counter").countimator();
  }

}
