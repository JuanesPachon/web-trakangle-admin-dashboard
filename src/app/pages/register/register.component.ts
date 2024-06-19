import { Component, signal } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


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

  errorMessage: string = '';

  

  //show password

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }
}
