import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email:['juan@gmail.com', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })
  
  constructor(private formBuilder: FormBuilder, private router: Router){}

  login(){
    if(this.loginForm.valid){
      console.log("Llamar al servicio de login")
      this.router.navigateByUrl('/inicio');
      this.loginForm.reset();
    }else{
      alert("Error")
    }
  }
}
