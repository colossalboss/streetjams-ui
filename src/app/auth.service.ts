import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  get isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  register(credentials) {
    // this.http.post<any>("/api/account", credentials).subscribe(res => {
    this.http.post<any>("https://street-jams-001.herokuapp.com/api/account", credentials).subscribe(res => {
      this.authenticate(res.tkn);
    })
  }

  login(credentials) {
    // this.http.post<any>("/api/account/login", credentials).subscribe(res => {
    this.http.post<any>("https://street-jams-001.herokuapp.com/api/account/login", credentials).subscribe(res => {
      this.authenticate(res.tkn);
    })
  }

  authenticate(tkn) {
    localStorage.setItem("token", tkn);

    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem("token");

    this.router.navigate(['login'])
  }
}
