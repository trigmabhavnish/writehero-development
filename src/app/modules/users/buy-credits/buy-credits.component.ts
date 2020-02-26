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
import { CreditCardValidator } from 'angular-cc-library';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { CreditsService, CommonUtilsService, UsersService } from '../../../core/_services';
declare var TCO: any;


@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {
  checkoutTokenForm: FormGroup;
  buyCreditsForm: FormGroup;
  buyCreditsSubmitted = false;
  loading:boolean = false;
  calAmountToPay: any;
  discountPercentage: any;
  isCouponApplied: boolean = false;
  couponCodeResponse: string;
  appliedCouponCode: string;
  isSubmitted:boolean =false;
  public payPalConfig?: IPayPalConfig; // Paypal Configuration


  constructor(private userAuthService:UsersService, private pageLoaderService:PageLoaderService,private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private creditsService: CreditsService, private toastr: ToastrManager, private router: Router) { }


  ngOnInit() {
    this.initcheckoutTokenForm()
    this.buyCredits();
    this.initConfig(); // Paypal Configuration    
  }

  /**
  * Initialize Project Specs Wizard Fields.
  */
  private buyCredits() {
    this.buyCreditsForm = this.formBuilder.group({
      credits: [0, Validators.compose([Validators.required, Validators.max(9999),Validators.min(1)])],
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

    // if coupon Code Not Applied then amount to pay is equal to credits.
    if (!this.isCouponApplied) {
      let calculateDiscount = this.buyCreditsForm.controls.credits.value;
      this.buyCreditsForm.controls.amount_to_pay.patchValue(calculateDiscount); // Update Amout to pay value
      this.calAmountToPay = calculateDiscount;
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
              value: this.calAmountToPay,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.calAmountToPay,
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
                  value: this.calAmountToPay,
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
        actions.order.get().then(details => {
          console.log('details', details);
        });
      },
      onClientAuthorization: (data) => {

        this.loading = true; // Show Page Loader
        let credits = this.buyCreditsForm.controls.credits.value;
        let payVia = this.buyCreditsForm.controls.pay_via.value;
        let couponCode = this.buyCreditsForm.controls.coupon_code.value;

        const transactionData = { code: this.makeRandomString(), unit: "Credits", qty: credits, cost: credits, payment_method: payVia, auth_token: localStorage.getItem('x-auth-token'), status: "Y", coupon_code: couponCode, discount: (this.discountPercentage) ? this.discountPercentage : 0, transaction_code: data.id, admin_note: "", amount_charged:this.calAmountToPay };

        this.creditsService.onTransactionComplete(transactionData).pipe(untilDestroyed(this)).subscribe(
          //case success
          (res) => {
            this.loading = false; //Hide Page Loader
            this.userAuthService.isProfileUpdated(true);
            this.commonUtilsService.onSuccess(res.response);
            this.router.navigate(['/user/billing']);
            //case error 
          }, error => {
            this.loading = false; //Hide Page Loader
            this.commonUtilsService.onError(error.response);
          });

      },
      onCancel: (data, actions) => {
        this.loading = false; //Hide Page Loader
        this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onError: err => {
        this.loading = false; //Hide Page Loader
        this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
      },
      onClick: (data, actions) => {
        this.loading = true; //Show Page Loader
        //this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
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

    if (couponCode != "" && credits != 0) {

      this.creditsService.checkCouponCodeExist({ coupon_code: couponCode }).pipe(untilDestroyed(this)).subscribe(
        //case success
        (res) => {
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
      this.isCouponApplied = false;
      this.couponCodeResponse = '<span class="red">' + environment.MESSAGES.CREDITS_NOT_EMPTY + '</span>';
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

  /**
   * Generate Random String 
   */
  public makeRandomString() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 8;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }





  private initcheckoutTokenForm(): void {

    this.checkoutTokenForm = this.formBuilder.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4), <any>Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  }

  /**
   * generate token form twoCehckout Gateway
   */
  public generateToken(): void {
    
    this.isSubmitted = true;
    if(!this.checkoutTokenForm.valid) return;
    this.loading = true;
    let args = {
      sellerId: environment.TWO_CEHCKOUT_SELLER_ID,
      publishableKey: environment.TWO_CHECKOUT_PUBLISHKEY,
      ccNo: this.checkoutTokenForm.controls.creditCard.value,
      cvv: this.checkoutTokenForm.controls.cvc.value,
      expMonth: this.checkoutTokenForm.controls.expirationDate.value.split('/')[0],
      expYear: this.checkoutTokenForm.controls.expirationDate.value.split('/')[1]
    }
    TCO.loadPubKey('sandbox', () => {
      TCO.requestToken(this.successFullTokenGeneration.bind(this), this.errorCallback.bind(this), args);
    });

  }
  /**
   * 
   * @param data on sucessfull toekn generation
   */
  private successFullTokenGeneration(data) {
    this.isSubmitted = false;
    this.makePayoutRequest(data.response.token.token)

  }
  /**
   * 
   * @param error on error of invalid details
   */
  private errorCallback(error) {
    this.isSubmitted = false;
    this.loading = false;
    this.commonUtilsService.onError(environment.MESSAGES.CREDIT_CARD_INVALID)

  }

/**
 * 
 * @param token is generated from twocheckout side
 */
  public makePayoutRequest(token): void {
  
       let body = {
            credits : this.buyCreditsForm.controls.credits.value,
            coupon_code:this.buyCreditsForm.controls.coupon_code.value,
            amount_to_pay:this.buyCreditsForm.controls.amount_to_pay.value,
            pay_via:this.buyCreditsForm.controls.pay_via.value,
            discount:this.discountPercentage ? this.discountPercentage : 0,
            code:this.makeRandomString(),
            token :token
    }


    this.creditsService.maketwoCheckoutPayoutRequest(body).pipe(untilDestroyed(this)).subscribe(response => {
          this.loading = false;
          this.userAuthService.isProfileUpdated(true);
         this.commonUtilsService.onSuccess(environment.MESSAGES.PAYENT_SUCCESS);
         this.router.navigate(['/user/billing']);
    }, error => {
      this.loading = false;
      this.commonUtilsService.onError(environment.MESSAGES.PAYMENT_FAILED);
    })
  }

    // This method must be present, even if empty.
    ngOnDestroy() {
      // To protect you, we'll throw an error if it doesn't exist.
    }
}
