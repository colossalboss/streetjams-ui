import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(private http: HttpClient) { }

  publish(data) {
    // return this.http.post("https://street-jams-001.herokuapp.com/api/songs", data, {
    //   reportProgress: true,
    //   observe: "events"
    // });
    return this.http.post("/api/songs", data, {
      reportProgress: true,
      observe: "events"
    });
  }
}
