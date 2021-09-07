import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabFormComponent } from './cab-form.component';

describe('CabFormComponent', () => {
  let component: CabFormComponent;
  let fixture: ComponentFixture<CabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
