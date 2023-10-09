import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { user } from 'src/app/services/auth/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
//OnDestroy es una buena practica para desuscribir los observables y evitar un escape de memoria

export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService){}

  ngOnDestroy(): void {
    this.loginService.currentUser.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }
  userLogin: boolean = false;
  userData?: user;

  ngOnInit():void{
    this.loginService.currentUser.subscribe({
        next:(userLogin)=>{
          this.userLogin=userLogin;
        }
      });

      this.loginService.currentUserData.subscribe({
        next:(userData) =>{
          this.userData=userData;
        }
      })
  }
}
