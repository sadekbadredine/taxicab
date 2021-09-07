import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      // map operator applies a function on each user
      map((user) => {
        // !!user will results true if the user is not null
        // so if we have a user, return true so the user can navigate to auther routes
        const isAuth = !!user;
        if (isAuth) return true;
        // else will redirect the user to the login page
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
