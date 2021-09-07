// COMPONENTS
import { CustomersManagementComponent } from './pages/customers-management/customers-management.component';
import { CustomerFormComponent } from './components/dialog/forms/customer-form/customer-form.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { AssignFormComponent } from './components/dialog/forms/assign-form/assign-form.component';
import { CabsManagementComponent } from './pages/cabs-management/cabs-management.component';
import { CabFormComponent } from './components/dialog/forms/cab-form/cab-form.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { AlertComponent } from './components/dialog/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AppComponent } from './app.component';
// MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// SERVICES
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CustomerService } from './services/customer.service';
import { LotteryService } from './services/lottery.service';
import { ApiService } from './services/api.service';
import { CabService } from './services/cab.service';
// CLASS DECORATOR
@NgModule({
  declarations: [
    CustomersManagementComponent,
    CabsManagementComponent,
    CustomerFormComponent,
    SidenavListComponent,
    AssignFormComponent,
    CabFormComponent,
    HeaderComponent,
    AlertComponent,
    LoginComponent,
    MainComponent,
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatSelectFilterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    RecaptchaModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    CustomerService,
    LotteryService,
    ApiService,
    CabService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
