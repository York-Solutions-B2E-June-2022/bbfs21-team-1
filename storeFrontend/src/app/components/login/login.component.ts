import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.dataService.onLogin(this.username, this.password);
  }
}
