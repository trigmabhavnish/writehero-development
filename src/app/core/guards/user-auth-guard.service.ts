import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//modules core services
import { UsersService } from '../../core/_services'

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService {

  constructor(private userAuthService: UsersService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    localStorage.clear();
    this.userAuthService.isLoggedIn(false, '');
    this.router.navigate(['/user/login']);
    //return false;
  }
}
