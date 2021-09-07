import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  // intercept will run code on the request before it reaches to subscribe
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // take operator takes the latest count of the emitted users to the user behavior subject, then unsubscribe
      take(1),
      // exhaust map waits until the previous observable to complete then we pass in a function that returns an observable that replaces the previous observable
      // in the entire observable chain
      // we used take and exhasut map because we don't wanna opon an ongoing subscription to the user behaviour subjcet,
      // instead we're only interested about the data whenever a request is made
      exhaustMap((user) => {
        // if we don't have a user, the request won't be sent
        if (!user) return next.handle(req);
        // else we modify the request with adding the desired params, in this case we're mocking a user's token interceptor request
        const modifiedRequest = req.clone({
          params: new HttpParams().set('authParamMock', 'mockUserToken'),
        });
        // then we continue the forwarding of thr request with modification
        return next.handle(modifiedRequest);
      })
    );
  }
}
