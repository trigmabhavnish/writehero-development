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
  isHomeUrl: boolean = false;
  constructor(private router: Router, private userAuthService: UsersService, private toastr: ToastrManager, private commonUtilsService: CommonUtilsService) {
    this.loadScripts();
  }

  ngOnInit() {
    // Page Refresh
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedin = true;
    }

    this.router.events.subscribe(() => {
      this.isHomeUrl = !(this.router.routerState.snapshot.url.includes('user') || this.router.routerState.snapshot.url.includes('terms') || this.router.routerState.snapshot.url.includes('privacy'));
      //console.log('hello', this.isHomeUrl);      
    })

    this.loginSubscription = this.userAuthService.checkLoggedinStatus().subscribe((loginStatus) => {
      this.isLoggedin = loginStatus.isLoggedIn;
    });


  }


  public setScroll(value): void {
    this.userAuthService.setScroll(value);
    $(".navbar-collapse").removeClass("show");
  }

  public setScrolltoDiv(value): void {
    this.router.navigate(['/']);
    this.setScroll(value);
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

  public openYoutubePopup(): void {    
    $('#videoModal').modal('show')
  }

  public stopYoutubeVideo(): void {    
    $("#videoModal iframe").attr("src", $("#videoModal iframe").attr("src"));
  }

  public toggleClass(): void {
    $("body").toggleClass("overflow-hidinghome");
    $(".nav-link").click(function () {
      $("nav").removeClass("show");
    });
  }
  public showRemove(): void {

    $(".navbar-collapse").removeClass("show");
  }
}
