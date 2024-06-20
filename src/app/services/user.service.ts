import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
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

}
