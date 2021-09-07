import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  customersChanged = new Subject<Customer[]>();
  private customers: Customer[] = [];

  constructor() {}
  // this is called from the api service wen the fetch method is called to store the customers locally
  setCustomers(customers: Customer[]) {
    this.customers = customers;
    // we next a copy of the customer array so we don't make any change by mistake to the original list
    this.customersChanged.next(this.customers.slice());
  }
  // return a specific customer according to it's position in the array
  getCustomer(index: string) {
    return this.customers[+index];
  }
  // returns the customer of a given name
  getCustomerByName(name: string) {
    let customer: Customer = this.customers.find((customer) => {
      return customer.name === name;
    });
    return customer;
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.customersChanged.next(this.customers.slice());
  }

  updateCustomer(index: string, newCustomer: Customer) {
    this.customers[+index] = newCustomer;
    this.customersChanged.next(this.customers.slice());
  }

  deleteCustomer(index: string) {
    this.customers.splice(+index, 1);
    this.customersChanged.next(this.customers.slice());
  }
}
