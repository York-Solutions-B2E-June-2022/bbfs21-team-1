import {Component, Injectable, OnInit, Optional} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {IUser} from "../../interfaces/IUser";
import {first, Subject} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  error!: string;

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(username: string, password: string) {
    return this.httpService.login(username, password).pipe(first()).subscribe({
      next: (data) => {
        this.dataService.setCurrentUser(data);
        this.router.navigate(["/"]);
      },
      error: () => {
        this.error = "Login unsuccessful. Username and/or password incorrect."
      }
    });
  }
}
