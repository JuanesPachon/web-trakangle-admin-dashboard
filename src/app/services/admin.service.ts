import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  loginAdmin(formValues: any) {
    return this.http.post('http://localhost:3000/admin/login', {
      email: formValues.email,
      password: formValues.password,
    });
  }
}
