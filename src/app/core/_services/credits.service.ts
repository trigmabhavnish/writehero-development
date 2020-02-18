import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
  * Check Coupon Code Exist
  * @param CouponCode Object
  * @return array
  */
  checkCouponCodeExist(postedData): Observable<any> {

    return this.httpClient
      .post('coupon/checkCouponCodeExist', postedData)
      .map((response: Response) => {
        return response;
      });

  }

  /**
  * On Successfully Added Amount to Credit
  * @param Transactiondata Object
  * @return array
  */
  onTransactionComplete(postedData): Observable<any> {

    return this.httpClient
      .post('credit/onTransactionComplete', postedData)
      .map((response: Response) => {
        return response;
      });

  }

/**
 * Get the transaction listing in billing
 */
  getTransactionsListing(body:any):Observable<any>{
    return this.httpClient
    .post('credit/transactionListing', body)
    .map((response: Response) => {
      return response;
    });
  }

  makeSkrillPayout(body:any):Observable<any>{
    let moneybookers_url = `https://www.moneybookers.com/app/payment.pl?pay_to_email=paulagabin@gmail.com&return_url=${body.return_url}&return_url_target=_blank&cancel_url=${body.cancel_url}&cancel_url_target=_blank&status_url=${body.status_url}&language=EN&amount=${body.amount}&currency=USD&detail1_description=${body.note}&detail1_text=123456&transaction_id=${body.mb_transaction_id}`;
    // let moneybookers_url = `https://www.skrill.com/app/pay.pl?action=prepare&email=paulagabin@gmail.com&password=""&amount=${body.amount}&currency=${body.currency}&subject=${body.subject}&note=${body.note}&frn_trn_id=${body.frn_trn_id}1&mb_transaction_id=${body.mb_transaction_id}`
   return this.httpClient.get(moneybookers_url)
  }
}
