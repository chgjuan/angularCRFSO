import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(private loginService: LoginService){}
  ngOnDestroy(): void {
    this.loginService.currentUser.unsubscribe();
  }
  userLogin: boolean = false;

  ngOnInit(): void{
    this.loginService.currentUser.subscribe(
      {
        next:(userLogin) =>{
          this.userLogin=userLogin;
        }
      }
    )
  }

}
