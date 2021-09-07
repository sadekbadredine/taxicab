import { AlertComponent } from '../components/dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  // we give the highest customer trip count every day a free trip
  constructor(private apiService: ApiService, private dialog: MatDialog) {
    // first we get all the customers
    this.apiService.fetch('customer').subscribe((customers) => {
      // then we create a date for the lottery to happen
      const lotteryDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000); //the expiration date is tomorrow
      // then we store in the browser's local storate
      localStorage.setItem('lotteryDate', lotteryDate.toString());
      // then we retrive it to calculate the remaining duration
      const savedDate = localStorage.getItem('lotteryDate');
      // then the remaining duration will be the future saved date minus now
      const remainingDuration =
        new Date(savedDate).getTime() - new Date().getTime();

      let customerToBeRewarded: Customer;
      let higherCustomerTripCount = 0;
      // then we check if now is the lottery time
      if (remainingDuration === 0) {
        // loop through all the customers
        customers.forEach((element) => {
          // and get the higher customer trips count
          if (parseInt(element.tripCount) > higherCustomerTripCount) {
            higherCustomerTripCount = parseInt(element.tripCount);
            customerToBeRewarded = element;
          }
        });
        // then we give the higher customer trip count a free trip every day
        setTimeout(() => {
          this.dialog.open(AlertComponent, {
            data: `${customerToBeRewarded.name} won a free trip lottery`,
          });
        }, 300);
      }
    });
  }
}
