import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user!: IUser;
  currentUser!: IUser;
  currentUser$ = new Subject<IUser | null>();

  constructor(private httpService: HttpService) {
  }

  onRegister(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.createUser(name, username, email, password, status).pipe(first()).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onLogin(username: string, password: string) {
    this.httpService.login(username, password).subscribe({
      next: (data) => {
        this.user = data;
        this.currentUser = this.user;
        this.currentUser$.next(this.currentUser);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onLogout() {
    this.currentUser$.next(null);
  }
}
