import { CabFormComponent } from 'src/app/components/dialog/forms/cab-form/cab-form.component';
import { AlertComponent } from 'src/app/components/dialog/alert/alert.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { CabService } from 'src/app/services/cab.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Cab } from 'src/app/models/cab.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cabs-management',
  templateUrl: './cabs-management.component.html',
  styleUrls: ['./cabs-management.component.scss'],
})
export class CabsManagementComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Cab[]>();
  fetchCabsSubscription: Subscription;
  destroyCabSubscription: Subscription;
  displayedColumns: Array<string> = [
    'id',
    'model',
    'number',
    'owner',
    'available',
    'edit',
    'remove',
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cabsService: CabService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((value) => {
      this.loadTableData(value);
    });
  }

  loadTableData(value) {
    this.fetchCabsSubscription = this.apiService
      .fetch(value.page)
      .subscribe((cabs: Cab[]) => {
        let cabsArray = [];
        cabs.forEach((element) => {
          cabsArray.push({ ...element });
        });
        this.dataSource = new MatTableDataSource<Cab[]>(cabsArray);
        this.dataSource.paginator = this.paginator;
      });
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  changeStatus(cab: Cab) {
    let statusModifiedCab;
    console.log(cab.available);
    if (cab.available === 'false') {
      statusModifiedCab = new Cab(
        cab.owner,
        cab.model,
        cab.number,
        cab.id,
        'true'
      );
    } else
      statusModifiedCab = new Cab(
        cab.owner,
        cab.model,
        cab.number,
        cab.id,
        'false'
      );
    console.log(statusModifiedCab);

    this.cabsService.updateCab(cab.id, statusModifiedCab);
    this.apiService.modify('cab', +cab.id, statusModifiedCab).subscribe(() => {
      setTimeout(() => {
        this.loadTableData({ page: 'cab' });
        this.dialog.open(AlertComponent, {
          data: 'Cab Status Updated !',
        });
      }, 300);
    });
  }

  onDeleteCab(index) {
    this.cabsService.deleteCab(index);
    this.destroyCabSubscription = this.apiService
      .destroy('cab', index)
      .subscribe(() => {
        this.loadTableData({ page: 'cab' });
      });
  }

  onUpdateCab(cab: Cab) {
    this.dialog.open(CabFormComponent, { data: cab });
  }

  statusRenderer(available) {
    return available === 'true' ? 'check' : 'clear';
  }

  ngOnDestroy() {
    this.fetchCabsSubscription.unsubscribe();
  }
}
