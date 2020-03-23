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

  constructor(private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
   
  }
  

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
