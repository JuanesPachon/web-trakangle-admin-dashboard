import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  userList() {
    return this.http.get('http://localhost:3000/users/');
  }

  registerUser(formValues: any) {
    return this.http.post('http://localhost:3000/users', {
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

    return this.http.patch(`http://localhost:3000/users/${userId}`, updateUser, {
      headers: headers,
    });
  }

  deleteUser(userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    return this.http.delete(`http://localhost:3000/users/${userId}`, {
      headers: headers,
    });
  }

}
