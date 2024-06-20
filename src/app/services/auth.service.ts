import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string) {
    localStorage.setItem('admin_token', token);
  }
  
  removeToken() {
    localStorage.removeItem('admin_token');
    return;
  }
}
