import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ExperienceListComponent } from './pages/experience-list/experience-list.component';
import { alreadyLoggedGuard } from './guards/alreadyLoggedGuard';
import { loginGuard } from './guards/loginGuard';

export const routes: Routes = [
    { path: "login", component: LoginComponent, canActivate: [alreadyLoggedGuard]},
    { path: "register", component: RegisterComponent, canActivate: [alreadyLoggedGuard] },
    { path: "", component: UserListComponent, canActivate: [loginGuard] },
    { path: "bookings", component: BookingListComponent , canActivate: [loginGuard]},
    { path: "experiences", component: ExperienceListComponent, canActivate: [loginGuard] },
    { path: "products/edit/:id", component: EditProductComponent },
    { path: "products/create", component: NewProductComponent }
];
