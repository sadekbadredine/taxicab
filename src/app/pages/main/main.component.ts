import { CustomerFormComponent } from 'src/app/components/dialog/forms/customer-form/customer-form.component';
import { AssignFormComponent } from 'src/app/components/dialog/forms/assign-form/assign-form.component';
import { CabFormComponent } from 'src/app/components/dialog/forms/cab-form/cab-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LotteryService } from 'src/app/services/lottery.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private lotteryService: LotteryService
  ) {}

  ngOnInit(): void {}

  createCab() {
    this.dialog.open(CabFormComponent);
  }

  createCustomer() {
    this.dialog.open(CustomerFormComponent);
  }

  assignDriver() {
    this.dialog.open(AssignFormComponent);
  }
}
