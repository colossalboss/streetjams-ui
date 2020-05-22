import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req, next) {
    let token = localStorage.getItem("token");

    let authRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    })
    return next.handle(authRequest);
  }
}
