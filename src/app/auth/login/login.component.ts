import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { loginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: string = "";

  loginForm = this.formBuilder.group({
    email:['juan@gmail.com', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })
  
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService){}

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as loginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      });

    }else{
      this.loginForm.markAllAsTouched();
      alert("Error")
    }
  }
}
