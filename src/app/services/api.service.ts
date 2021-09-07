import { environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { CabService } from './cab.service';
import { Injectable } from '@angular/core';
import { Cab } from '../models/cab.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private accessPointUrl: string = environment.serverApiUrl;

  constructor(
    private customer: CustomerService,
    private http: HttpClient,
    private auth: AuthService,
    private cab: CabService
  ) {}
  // Perfroms Http get request with a specified target on the api endpoint, then performs different actions according to the target
  fetch(target: string): Observable<any> {
    return this.http.get(this.accessPointUrl + target).pipe(
      // tap operator perfrom some code on the response that doesn't affect the response itself
      tap((response) => {
        switch (target) {
          case 'cab':
            this.cab.setCabs(response);
          case 'customer':
            this.customer.setCustomers(response);
            break;
          case 'user':
            this.auth.setUsers(response);
            break;
          default:
            break;
        }
      })
    );
  }
  // performs a post request and return an observable of the response
  store(target: string, data: Cab | Customer | User) {
    return this.http.post(this.accessPointUrl + target, data);
  }
  // we return the http verb to subscribe to it later in the place we're interested in the response
  modify(target, index: number, data: Cab | Customer) {
    return this.http.put(this.accessPointUrl + target + '/' + index, data);
  }

  destroy(target, index: number) {
    return this.http.delete(this.accessPointUrl + target + '/' + index);
  }
}
