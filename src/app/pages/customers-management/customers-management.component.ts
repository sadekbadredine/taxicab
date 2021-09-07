import { CustomerFormComponent } from 'src/app/components/dialog/forms/customer-form/customer-form.component';
import { AlertComponent } from 'src/app/components/dialog/alert/alert.component';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Cab } from 'src/app/models/cab.model';

@Component({
  selector: 'app-customers-management',
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.scss'],
})
export class CustomersManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Cab[]>();
  displayedColumns: Array<string> = [
    'id',
    'name',
    'country',
    'city',
    'street',
    'onboard',
    'tripCount',
    'edit',
    'remove',
  ];

  constructor(
    private customersService: CustomerService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // when the user vists customers page, we load the data related to that page in a table
    this.route.data.subscribe((value) => {
      this.loadTableData(value);
    });
  }

  private loadTableData(value) {
    this.apiService.fetch(value.page).subscribe((customers: Customer[]) => {
      let customersArray = [];
      customers.forEach((customer) => {
        customersArray.push({ ...customer });
      });
      this.dataSource = new MatTableDataSource(customersArray);
      this.dataSource.paginator = this.paginator;
    });
  }

  changeStatus(customer: Customer) {
    // change customre's onboard status, if he is in a cab or not
    let statusModifiedCustomer;
    // if not, create a new customer with a truish onboard value
    if (customer.onboard === 'false') {
      statusModifiedCustomer = new Customer(
        customer.name,
        customer.address,
        customer.id,
        'true'
      );
      // or create a new customer with a falsish onboard value
    } else
      statusModifiedCustomer = new Customer(
        customer.name,
        customer.address,
        customer.id,
        'false'
      );
    // then we update the newly created customer in the customer service locally
    this.customersService.updateCustomer(customer.id, statusModifiedCustomer);
    // then we modify this user in the database
    this.apiService
      .modify('customer', +customer.id, statusModifiedCustomer)
      .subscribe(() => {
        // then we re load the data table so we get this dynamic feeling
        setTimeout(() => {
          this.loadTableData({ page: 'customer' });
          // then we alret a success modification
          this.dialog.open(AlertComponent, {
            data: 'Customer Status Updated !',
          });
        }, 300);
      });
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdateCustomer(customer: Customer) {
    this.dialog.open(CustomerFormComponent, { data: customer });
  }

  onDeleteCustomer(index) {
    this.customersService.deleteCustomer(index);
    this.apiService.destroy('customer', index).subscribe(() => {
      this.loadTableData({ page: 'customer' });
    });
  }
}
