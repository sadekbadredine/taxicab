import { CustomerService } from 'src/app/services/customer.service';
import { ApiService } from 'src/app/services/api.service';
import { CabService } from 'src/app/services/cab.service';
import { Customer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Cab } from 'src/app/models/cab.model';

@Component({
  selector: 'app-assign-form',
  templateUrl: './assign-form.component.html',
  styleUrls: ['./assign-form.component.scss'],
})
export class AssignFormComponent implements OnInit {
  private selectedCustomer: string;
  private selectedCab: string;
  public availableCabs = [];
  public customerList = [];

  public filteredCustomerList = this.customerList.slice();
  public filteredCabsList = this.availableCabs.slice();

  constructor(
    private customersService: CustomerService,
    private cabsService: CabService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // first we gett all the available cabs, and all the customers that are not onboard
    this.getAvailableCabs();
    this.getOffboardCustomers();
  }
  // catches the selection of a cab
  selectCab(event) {
    this.selectedCab = event;
  }
  // catches the selection of a customer
  selectCustomer(event) {
    this.selectedCustomer = event;
  }
  // we get all the cabs that are available
  getAvailableCabs() {
    this.apiService.fetch('cab').subscribe((cabs: Cab[]) => {
      let availableCabs = [];
      cabs.forEach((element) => {
        if (element.available === 'true') availableCabs.push(element.owner);
      });
      this.availableCabs = availableCabs;
      this.filteredCabsList = this.availableCabs.slice();
    });
  }
  // we get all the customers that are not onboard
  getOffboardCustomers() {
    this.apiService.fetch('customer').subscribe((customers: Customer[]) => {
      let customersList = [];
      customers.forEach((element) => {
        if (element.onboard === 'false') customersList.push(element.name);
      });
      this.customerList = customersList;
      this.filteredCustomerList = this.customerList.slice();
    });
  }

  assignDriverToCustomer() {
    // modify the selected customer
    let customerToModify = this.customersService.getCustomerByName(
      this.selectedCustomer
    );
    // we set the onboard value to true
    // and we add one trip to it's tripcount property
    let modifiedCustomer: Customer = new Customer(
      customerToModify.name,
      customerToModify.address,
      customerToModify.id,
      'true',
      (parseInt(customerToModify.tripCount) + 1).toString()
    );
    // then we update and modify this customer so changes will reflect to the user
    this.customersService.updateCustomer(modifiedCustomer.id, modifiedCustomer);
    this.apiService
      .modify('customer', +customerToModify.id, modifiedCustomer)
      .subscribe();
    // and then we modify the selected cab
    // and we set the available property to false
    let cabToModify = this.cabsService.getCabByName(this.selectedCab);
    let modifiedCab: Cab = new Cab(
      cabToModify.owner,
      cabToModify.model,
      cabToModify.number,
      cabToModify.id,
      'false'
    );
    this.cabsService.updateCab(cabToModify.id, modifiedCab);
    this.apiService
      .modify('cab', +cabToModify.id, modifiedCab)
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }
}
