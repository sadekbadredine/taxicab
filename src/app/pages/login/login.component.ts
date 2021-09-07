import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  userSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.authService.autoLogin();
    // when the application starts, we get all the users
    this.userSubscription = this.apiService.fetch('user').subscribe();
  }

  ngOnInit(): void {}

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onSubmit(form: NgForm) {
    // then we create a new user object with the data input
    let userData = new User(form.value.email, form.value.password);
    // then we create an observable that wraps the user behavior subject observable
    let authObs: Observable<any> = this.authService.user;
    // then we crate a subscriber to use in many place
    let authSub: Subscription = authObs.subscribe((user) => {
      // the subscriber checks if we have a user then navigate to the main page
      if (!!user) this.router.navigate(['']);
    });
    // if we're loggin in
    if (this.isLoginMode) {
      // we call the login method on aut service to authenticate the user input data and react to the results
      this.authService.login(userData);
      // then we call our auth subscriber to check if a user has been emmited, so the app is authorized, so we can navigate the user to the home page
      authSub;
    } else {
      // in the sign up case, after the authentication process is done
      this.authService.signup(userData);
      if (this.authService.isAuthorized) {
        // we check if the page state is authorized so we can store the newly created user
        this.apiService.store('user', userData).subscribe();
        // then we call our subscriber to navigate the user to the home page
        authSub;
      }
    }
  }

  switchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
