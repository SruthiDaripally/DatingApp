import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;


constructor(private http: HttpClient) { }

login(model: any){
  return this.http
  .post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user){
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );
}

register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
