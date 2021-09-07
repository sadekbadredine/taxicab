import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CabService } from 'src/app/services/cab.service';
import { ApiService } from 'src/app/services/api.service';
import { Cab } from 'src/app/models/cab.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cab-form',
  templateUrl: './cab-form.component.html',
  styleUrls: ['./cab-form.component.scss'],
})
export class CabFormComponent implements OnInit {
  editMode = false;
  titleAction = 'Create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Cab,
    private cabsService: CabService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    if (this.data === null) this.data = { owner: '', model: '', number: '' };
    else {
      this.titleAction = 'Update';
      this.editMode = true;
    }
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    let newCab = new Cab(
      form.value.owner,
      form.value.model,
      form.value.number,
      'true'
    );
    if (this.editMode) {
      this.cabsService.updateCab(this.data.id, newCab);
      this.apiService
        .modify('cab', +this.data.id, {
          owner: newCab.owner,
          model: newCab.model,
          number: newCab.number,
          available: newCab.available.toString(),
        })
        .subscribe(() => {
          this.dialog.closeAll();
        });
    } else {
      this.cabsService.addCab(newCab);
      this.apiService.store('cab', newCab).subscribe(() => {
        this.dialog.closeAll();
      });
    }
  }
  // "available": false,
}
