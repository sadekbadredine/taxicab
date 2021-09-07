import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  data;
  constructor(@Inject(MAT_DIALOG_DATA) public message) {
    this.data = message;
  }

  ngOnInit(): void {}
}
