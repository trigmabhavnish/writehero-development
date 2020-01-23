import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { CreditsService, CommonUtilsService } from '../../../core/_services';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'; // Integrate Paypal


@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {

  buyCreditsForm: FormGroup;
  buyCreditsSubmitted = false;
  calAmountToPay:any;
  public payPalConfig?: IPayPalConfig;


  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private creditsService: CreditsService, private toastr: ToastrManager, private router: Router) { }

  /**
  * Initialize Project Specs Wizard Fields.
  */
  private buyCredits() {
    this.buyCreditsForm = this.formBuilder.group({
      credits: [0, Validators.compose([Validators.required, Validators.min(1)])],
      coupon_code: [''],
      pay_via: ['paypal', [Validators.required]]
    });
  }

  validateBuyCreditsWizard(){
    this.buyCreditsSubmitted = true;
    if (this.buyCreditsForm.invalid) {
      this.buyCreditsSubmitted = false;
      return;
    }

    if(this.buyCreditsForm.controls.coupon_code.value != ""){
      let couponCode = this.buyCreditsForm.controls.coupon_code.value;

      this.creditsService.checkCouponCodeExist({ coupon_code: couponCode }).pipe(untilDestroyed(this)).subscribe(
        //case success
        (res) => {          
          console.log(res);
          //case error 
        }, error => {
          this.commonUtilsService.onError(error.response);
        });
    }

  }

  /**
   * Configure Paypal Parameters. 
   */
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: "environment.PAYPAL_CLIENT_ID",
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              //value: this.selectedCarDetails.my_bid.bid_price,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  //value: this.selectedCarDetails.my_bid.bid_price,
                }
              }
            },
            items: [
              {
               // name: this.selectedCarDetails.vin,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  //value: this.selectedCarDetails.my_bid.bid_price,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        //this.commonUtilsService.showPageLoader(environment.MESSAGES.PAYMENT_SUCCESS);
        //console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          //console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

       
      },
      onCancel: (data, actions) => {
        //this.close();
        //console.log('OnCancel', data, actions);
        //$(this.contentSection.nativeElement).modal('hide'); // Close the current popup
        //this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onError: err => {
        //this.close();
        //console.log('OnError', err);
       // $(this.contentSection.nativeElement).modal('hide'); // Close the current popup
        //this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onClick: (data, actions) => {
        //console.log('onClick', data, actions);
      },
    };
  }

  /**
   * validate wizard and move to either direction. 
   * @param validityStatus boolean(form validation status)
   * @param direction boolean(wizard direction)
   * @return  boolean
   */
  moveDirection = (validityStatus, direction) => {
    if (direction === MovingDirection.Backwards) {
      return true;
    }
    return validityStatus;
  };

  ngOnInit() {
    this.buyCredits();
  }

}
