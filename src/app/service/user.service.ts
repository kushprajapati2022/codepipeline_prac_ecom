import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userAuthError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignup(user: SignUp) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        console.log('result', result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });

    console.log('user data', user);
  }

  userLogin(data: Login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((data) => {
        if (data && data.body?.length) {
          localStorage.setItem('user', JSON.stringify(data.body[0]));
          this.router.navigate(['/']);
          this.userAuthError.emit(false);
          console.log('data console', data);
        } else {
          this.userAuthError.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
