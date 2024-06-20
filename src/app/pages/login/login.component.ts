import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLinkWithHref, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private adminService = inject(AdminService);
  private authService = inject(AuthService);
  private router = inject(Router);

  adminForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })

  onSubmit(event: Event) {

    if(this.adminForm.valid) {

      this.adminService.loginAdmin(this.adminForm.value).subscribe({

        next: (response: any) => {
          this.authService.setToken(response.token);
          this.router.navigate([""]);
        },
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An Server error occurred. Please try again later.';
          }
        }

      })

    }

  }

  errorMessage: string = '';

  //show password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }

}