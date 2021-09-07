import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from 'src/app/models/customer.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  editMode = false;
  titleAction = 'Create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private customerService: CustomerService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    // if the dialog was opened with data, then we're in the edit mode
    // so if we don't have data
    if (!this.data)
      // we're not in edit mode
      this.data = { name: '', address: { country: '', city: '', street: '' } };
    else {
      {
        // else we're in edit mode
        this.titleAction = 'Update';
        this.editMode = true;
      }
    }
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    let newCustomer: Customer = new Customer(form.value.name, {
      country: form.value.country,
      city: form.value.city,
      street: form.value.street,
    });
    if (this.editMode) {
      this.customerService.updateCustomer(this.data.id, newCustomer);
      this.apiService
        .modify('customer', +this.data.id, newCustomer)
        .subscribe(() => {
          this.dialog.closeAll();
        });
    } else {
      this.customerService.addCustomer(newCustomer);
      this.apiService.store('customer', newCustomer).subscribe(() => {
        this.dialog.closeAll();
      });
    }
  }
}
