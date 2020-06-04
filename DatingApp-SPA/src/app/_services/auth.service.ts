import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelperService = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) {}

  login(model) {
    return this.httpClient.post<{token: string}>(`${this.baseUrl}login`, model)
      .pipe(
        map(response => {
          if (response) {
            localStorage.setItem('token', response.token);
            this.setDecodedToken(response.token)
          }
        })
      );
  }

  register(model) {
    return this.httpClient.post(`${this.baseUrl}register`, model)
  }

  logIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }

  setDecodedToken(token) {
    this.decodedToken = this.jwtHelperService.decodeToken(token);
  }
}
