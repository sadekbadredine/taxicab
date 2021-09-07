import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabsManagementComponent } from './cabs-management.component';

describe('CabsManagementComponent', () => {
  let component: CabsManagementComponent;
  let fixture: ComponentFixture<CabsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
