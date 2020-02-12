import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { UsersService } from '../_services/'


@Injectable()
export class ApiIntercepter implements HttpInterceptor {


  constructor(private userAuthService: UsersService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check Dealer Subscription Expired or Not

    let setHeaders;
    if (localStorage.getItem('isLoggedIn')) {
      setHeaders = { 'x-auth-token': localStorage.getItem('x-auth-token') };
    } else {
      setHeaders = {};
    }

    //let apiReq = request.clone({ url: `${request.url}` });
    let apiReq = request.clone({ url: environment.API_ENDPOINT + '/api/' + `${request.url}`, setHeaders: setHeaders });

    return next.handle(apiReq);

  }


}