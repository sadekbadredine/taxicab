import { AlertComponent } from '../components/dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userListChanged = new Subject<User[]>();
  // we use behavior subjet here,because it gives subscribers immediate access to the previously emmitted value,
  // even if they haven't subscribed at the point of time that value was emmitted.
  user = new BehaviorSubject<User>(null);
  private userList: User[] = [];
  isAuthorized = false;

  constructor(private dialog: MatDialog, private router: Router) {}

  // we use slice method to return a copy of the user array to avoid accessing the array maliciously
  setUsers(users: User[]): void {
    this.userList = users;
    this.userListChanged.next(this.userList.slice());
  }
  // sign up method checks if user deons't exit then authenticate signup, or alert an existing user
  signup(newUser: User): void {
    if (this.findUser(newUser.email))
      this.dialog.open(AlertComponent, { data: 'User Already Exist' });
    else this.handleAuthentication(newUser);
  }
  // log in method check if the user exist
  login(user: User): void {
    if (this.findUser(user.email))
      if (this.getUserByEmail(user.email).password === user.password)
        // then check if this user's entered password matches the password of the found user
        this.handleAuthentication(user);
      else this.dialog.open(AlertComponent, { data: 'Oops! Wrong Password.' });
    else this.dialog.open(AlertComponent, { data: 'Email Does Not Exist !' });
  }
  // log out emit null to the user subject so the app is not authenticated anymore
  logout(): void {
    this.user.next(null);
    // and we remove the user from local storage so we can't auto login on page reload
    localStorage.removeItem('user');
    // then we navigate to the login page
    this.router.navigate(['auth']);
  }
  // we check if we have a store user in the browser's local storage, then we authenticate login
  autoLogin() {
    const loadedUser: User = JSON.parse(localStorage.getItem('user'));
    if (!loadedUser) return;
    this.handleAuthentication(loadedUser);
  }

  // Helper Methods

  // handle authentciation
  private handleAuthentication(user: User): void {
    // sets isAuthorized true so we can rely on this varible to perfrom needed actions such as storing new users
    this.isAuthorized = true;
    // we always navigate the user to the home page
    this.router.navigate(['']);
    // we broadcast a new user to all the interested parts of the app that relies on the authentication state
    this.user.next(user);
    // we store the user in the local storage so we can aut log him up on page reload
    localStorage.setItem('user', JSON.stringify(user));
  }
  // returns a slice of the users list
  private getUsers(): User[] {
    return this.userList.slice();
  }
  // another way of retriving a user of a given email
  private getUserByEmail(email: string): User {
    return this.userList.slice()[
      this.userList.findIndex((user) => {
        return user.email === email;
      })
    ];
  }
  // checks if the user email exist in the users private array
  private findUser(email: string): boolean {
    if (this.getUsers().find((userData) => userData.email === email))
      return true;
  }
}
