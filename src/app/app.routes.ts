import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "users", component: UserListComponent },
    { path: "bookings", component: BookingListComponent },
/*     { path: "experiences", component: ExperienceListComponent }, */
    { path: "products/edit/:id", component: EditProductComponent },
    { path: "products/create", component: NewProductComponent }
];
