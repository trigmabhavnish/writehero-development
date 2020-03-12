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
export class UsersService {

  public loggedIn: Subject<any> = new Subject<any>();
  public scrollId: Subject<any> = new Subject<any>();
  public profileUpdatedStatus: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  isLoggedIn(value: boolean, accountType: String) {
    this.loggedIn.next({ isLoggedIn: value, accountType: accountType });
  }
  setScroll(value: boolean) {
    this.scrollId.next({ scrollId: value });
  }
  checkLoggedinStatus(): Observable<any> {
    return this.loggedIn.asObservable();
  }

  isProfileUpdated(value: boolean) {
    this.profileUpdatedStatus.next(value);
  }
  
  getUpdatedProfileStatus(): Observable<any> {
    return this.profileUpdatedStatus.asObservable();
  }

  /**
  * New User Registeration
  * @return string
  */
  userSignUp(postedData): Observable<any> {

    return this.httpClient
      .post('user/signup', postedData)
      .map((response: Response) => {
        return response;
      });

  }

  /**
  * User Forgot Password
  * @return string
  */
  userForgotPassword(postedData): Observable<any> {
    return this.httpClient
      .post('user/forgotPassword', postedData)
      .map((response: Response) => {
        return response;
      });
  }

  /**
  * User Reset Password
  * @return string
  */
 userResetPassword(postedData): Observable<any> {
  return this.httpClient
    .post('user/resetPassword', postedData)
    .map((response: Response) => {
      return response;
    });
}

  /**
  * User Login
  * @return string
  */
  userLogin(postedData): Observable<any> {
    return this.httpClient
      .post('user/login', postedData, { observe: 'response' })
      .map((response: any) => {
        return response;
      });
  }

   /**
  * User Login
  * @return string
  */
 loginWithFb(postedData): Observable<any> {
  return this.httpClient
    .post('user/loginWithFb', postedData, { observe: 'response' })
    .map((response: any) => {
      return response;
    });
}
  /**
  * User Logout
  * @return object
  */
  userLogout(postedData): Observable<any> {
    return this.httpClient
      .post('user/logout', postedData)
      .map((response: Response) => {
        return response;
      });
  }

  /**
  * get Director Id for New User Registeration
  * @return number
  */
  getDirectorID(postedData): Observable<any> {
    return this.httpClient
      .post('user/get_director_id', postedData)
      .map((response: Response) => {
        return response;
      });
  }

  /**
  * User Forgot Password
  * @return string
  */
  userVerifyAuthToken(postedData): Observable<any> {
    return this.httpClient
      .post('user/verifyAuthToken', postedData)
      .map((response: Response) => {
        return response;
      });
  }

  //if user loggedin then redirect
  checkLoginAndRedirect() {
    if (localStorage.getItem('isLoggedIn'))
      this.router.navigate(['/user/dashboard']);
  }

  changePassword(body):Observable<any>{
    return this.httpClient.post('user/changePassword',body);
  }
  getUserProfile():Observable<any>{
    return this.httpClient.get('user/getProfile');
  }
  updateProfile(body:any):Observable<any>{
    return this.httpClient.post('user/updateProfile',body);
  }
  updateProfilePic(body:any):Observable<any>{
    return this.httpClient.post('user/updateProfilePic',{profile_pic:body});
  }
  

  getUserNotifications(body:any):Observable<any>{
    return this.httpClient.post('user/getNotifications',body);
  }
  getUserNotificationsCount():Observable<any>{
    return this.httpClient.post('user/notificationCount',{});
  }
}
