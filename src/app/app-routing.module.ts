import { CustomersManagementComponent } from './pages/customers-management/customers-management.component';
import { CabsManagementComponent } from './pages/cabs-management/cabs-management.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: LoginComponent },
  {
    path: 'cabs',
    component: CabsManagementComponent,
    data: {
      page: 'cab',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersManagementComponent,
    data: {
      page: 'customer',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
