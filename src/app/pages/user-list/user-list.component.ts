import { Component, inject, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private userService = inject(UserService);
  users = signal<any>([])

  ngOnInit() {

    this.userService.userList().subscribe({
      next: (users: any) => {
        this.users.set(users);
      },
      error: (error) => {
        console.log(error);
      }
    });

    if (localStorage.getItem('showNotification') === 'true') {
      this.activeNotification.update(value => !value);
      localStorage.removeItem('showNotification');
    }
  }

  // Create user Overlay logic

  showCreateOverlay = signal(false);
  activeNotification = signal(false);

  toggleCreateOverlay() {
    this.showCreateOverlay.update(value => !value);
  }

  // Create Request

  errorMessage: string = '';

  registerForm = new FormGroup({
    name: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    userName: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    email: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    password: new FormControl("",{
      validators: [ Validators.required, Validators.minLength(5) ],
    }),
    
  })

  onSubmit(event: Event){
    if(this.registerForm.valid){

      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (user) => {
          window.location.reload();
          localStorage.setItem('showNotification', 'true');
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = 'Email is already in use';
          } else if (error.status === 400) {
            this.errorMessage = error.error.errors[0];
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          console.log(error);
        }
      })
    }
  }

}
