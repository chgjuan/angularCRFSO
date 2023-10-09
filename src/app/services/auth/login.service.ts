import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { user } from './users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<user> = new BehaviorSubject<user>({id:0, email:''});

  constructor(private httpClient: HttpClient) { }

  login(credentials: loginRequest): Observable<user>{
    return this.httpClient.get<user>('././assets/data.json').pipe(
      tap((userData: user) => {
        this.currentUserData.next(userData);
        this.currentUser.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.log('Se ha producido un erro', error.error);
    }else{
      console.error('Backend retornó el código de estado', error.status, error.error);
    }
    return throwError(() =>new Error('Algo falló. Por favor intente nuevamente'));
  }

  get userData(): Observable<user>{
    return this.currentUserData.asObservable();
  }

  get userDataLogin(): Observable<boolean>{
    return this.currentUser.asObservable();
  }
}
