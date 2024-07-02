import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationComponent } from '../notification/notification.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  @Input() user: any = {};

  private userService = inject(UserService);

  // Edit user Overlay logic

  showEditOverlay = signal(false);
  activeEditNotification = signal(false);

  toggleEditOverlay() {
    this.showEditOverlay.update((value) => !value);
  }

  // Create Request

  errorMessage: string = '';

  editForm = new FormGroup({
    name: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // Edit Request

  onEditSubmit(event: Event) {
    if(this.editForm.valid){
      
      this.userService.editUser(this.editForm.value, this.user._id).subscribe({
        next: (user) => {
          window.location.reload();
          localStorage.setItem('showEditNotification', 'true');
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
          console.log(this.user._id);
        }
      })
    }
  }

  // delete user logic

  deleteUser() {
    this.userService.deleteUser(this.user._id).subscribe({
      next: () => {
        window.location.reload();
        localStorage.setItem('showDeleteNotification', 'true');
      },
      error: (error) => {
        console.log(error);
        console.log(this.user._id);
        
      }
    })
  }

  activeDeleteNotification = signal(false);

  ngOnInit() {
    if (localStorage.getItem('showEditNotification') === 'true') {
      this.activeEditNotification.update(value => !value);
      localStorage.removeItem('showEditNotification');
    }

    if (localStorage.getItem('showDeleteNotification') === 'true') {
      this.activeDeleteNotification.update(value => !value);
      localStorage.removeItem('showDeleteNotification');
    }
  }

  //show password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }

}
