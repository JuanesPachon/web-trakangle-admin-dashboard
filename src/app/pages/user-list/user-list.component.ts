import { Component, inject, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
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
        console.log(users);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}
