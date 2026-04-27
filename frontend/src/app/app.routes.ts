import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MyBookingsComponent } from './features/bookings/my-bookings/my-bookings.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PropertyDetailComponent } from './features/properties/detail/property-detail.component';
import { HomeComponent } from './features/properties/home/home.component';
import { PropertyListComponent } from './features/properties/list/property-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];
