import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  userList() {
    return this.http.get('https://web-trekangle-server.onrender.com/users/');
  }

  registerUser(formValues: any) {
    return this.http.post('https://web-trekangle-server.onrender.com/users', {
      name: formValues.name,
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
    });
  }

  editUser(formValues: any, userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    const updateUser: any = {};

    if (formValues.name) {
      updateUser.name = formValues.name;
    }
    if (formValues.userName) {
      updateUser.userName = formValues.userName;
    }
    if (formValues.email) {
      updateUser.email = formValues.email;
    }
    if (formValues.password) {
      updateUser.password = formValues.password;
    }

    return this.http.patch(`https://web-trekangle-server.onrender.com/users/${userId}`, updateUser, {
      headers: headers,
    });
  }

  deleteUser(userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    return this.http.delete(`https://web-trekangle-server.onrender.com/users/${userId}`, {
      headers: headers,
    });
  }

}
