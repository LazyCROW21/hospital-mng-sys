import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AppointmentComponent } from './dashboard/appointment/appointment.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './dashboard/departments/department/department.component';
import { DepartmentsComponent } from './dashboard/departments/departments.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AboutComponent } from './home/about/about.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { FacilityComponent } from './home/facility/facility.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { UsersComponent } from './dashboard/users/users.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    children: [
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: 'facilities', component: FacilityComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contactus', component: ContactusComponent },
    ]
  },
  { path: 'login', component: AuthComponent, canActivate: [AuthGuard] },
  { 
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      // General
      { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
      { path: 'departments', component: DepartmentsComponent, pathMatch: 'full' },
      { path: 'departments/:id', component: DepartmentComponent, pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent },
      // Patient
      { path: 'appointments', component: AppointmentComponent },
      { path: 'profile', component: ProfileComponent },
      // Doctor
      { path: 'doctors', component: DoctorsComponent },
      // Admins
      { path: 'admins', component: AdminsComponent, pathMatch: 'full' },
      { path: 'admins/:id', component: ProfileComponent, pathMatch: 'full' },
      { path: 'users', component: UsersComponent, pathMatch: 'full' },
      { path: 'users/:id', component: ProfileComponent, pathMatch: 'full' },
    ]
  },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
