import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  createUser(name: string, username: string, email: string, password: string, status: string) {
    console.log("test")
    return this.httpClient.post(
      "http://localhost:8080/account/create",
      {name, username, email, password, status}
    ) as Observable<any>
  }
}
