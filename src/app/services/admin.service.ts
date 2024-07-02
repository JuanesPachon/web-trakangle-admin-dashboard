import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  loginAdmin(formValues: any) {
    return this.http.post('https://web-trekangle-server.onrender.com/admin/login', {
      email: formValues.email,
      password: formValues.password,
    });
  }
}
