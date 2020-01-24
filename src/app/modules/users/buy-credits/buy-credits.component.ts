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
import { IPayPalConfig, ICreateOrderRequest, IPurchaseUnit } from 'ngx-paypal';
import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { CreditsService, CommonUtilsService } from '../../../core/_services';



@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {

  buyCreditsForm: FormGroup;
  buyCreditsSubmitted = false;
  calAmountToPay: any;
  discountPercentage: any;
  isCouponApplied: boolean = false;
  couponCodeResponse: string;
  appliedCouponCode: string;

  public payPalConfig?: IPayPalConfig; // Paypal Configuration

  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private creditsService: CreditsService, private toastr: ToastrManager, private router: Router) { }


  ngOnInit() {
    this.buyCredits();
    this.initConfig(); // Paypal Configuration    
  }

  /**
  * Initialize Project Specs Wizard Fields.
  */
  private buyCredits() {
    this.buyCreditsForm = this.formBuilder.group({
      credits: [0, Validators.compose([Validators.required, Validators.min(1)])],
      coupon_code: [''],
      amount_to_pay: [''],
      pay_via: ['paypal', [Validators.required]]
    });
  }

  validateBuyCreditsWizard() {
    this.buyCreditsSubmitted = true;
    if (this.buyCreditsForm.invalid) {
      this.buyCreditsSubmitted = false;
      return;
    }
  }

  /**
   * Configure Paypal Parameters. 
   */
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.PAYPAL_CLIENT_ID,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '10',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '10',
                }
              }
            },
            items: [
              {
                name: 'Buywy Credits',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '10',
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
        console.log('actions', actions);
        //this.commonUtilsService.showPageLoader(environment.MESSAGES.PAYMENT_SUCCESS);
        //console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          //console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        console.log('data', data);

      },
      onCancel: (data, actions) => {
        //this.close();
        console.log('OnCancel', data, actions);
        //$(this.contentSection.nativeElement).modal('hide'); // Close the current popup
        //this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onError: err => {
        //this.close();
        console.log('OnError', err);
        // $(this.contentSection.nativeElement).modal('hide'); // Close the current popup
        //this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
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

  /**
   * Calculate Discount if Coupon Code is entered 
   */
  public calculateDiscount(couponCode, credits): void {
    let calculateDiscount;
    if (couponCode != "" && credits != "") {

      this.creditsService.checkCouponCodeExist({ coupon_code: couponCode }).pipe(untilDestroyed(this)).subscribe(
        //case success
        (res) => {
          //console.log(res);
          if (res.cost != "") {
            let cost = res.cost;
            calculateDiscount = credits * ((100 - cost) / 100);

            this.discountPercentage = cost;
            this.isCouponApplied = true;
            this.couponCodeResponse = '<span class="green">' + environment.MESSAGES.COUPON_CODE_APPLIED + '</span>';

            this.buyCreditsForm.controls.amount_to_pay.patchValue(calculateDiscount); // Update Amout to pay value
            this.calAmountToPay = calculateDiscount; // Uploaded Amount To Pay to Preview
            this.appliedCouponCode = couponCode; // Update Coupon Code value to preview
          } else {
            this.isCouponApplied = false;
            this.couponCodeResponse = '<span class="red">' + environment.MESSAGES.COUPON_CODE_INVALID + '</span>';
            calculateDiscount = this.buyCreditsForm.controls.credits.value;
            this.buyCreditsForm.controls.amount_to_pay.patchValue(calculateDiscount); // Update Amout to pay value
            this.calAmountToPay = calculateDiscount; // Uploaded Amount To Pay to Preview

          }
          //case error 
        }, error => {
          this.commonUtilsService.onError(error.response);
        });
    } else {
      calculateDiscount = this.buyCreditsForm.controls.credits.value;
      this.buyCreditsForm.controls.amount_to_pay.patchValue(calculateDiscount); // Update Amout to pay value
      this.calAmountToPay = calculateDiscount;
    }
  }

  /**
   * Remove Coupon Code 
   */
  public removeDiscount(): void {
    let calculateDiscount;
    calculateDiscount = this.buyCreditsForm.controls.credits.value;
    this.buyCreditsForm.controls.amount_to_pay.patchValue(calculateDiscount);
    this.isCouponApplied = false;
    this.couponCodeResponse = '<span class="green">' + environment.MESSAGES.COUPON_CODE_REMOVED + '</span>';
    this.calAmountToPay = calculateDiscount;
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }


}
