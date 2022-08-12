import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser:any = {
    id: undefined,
    name: "",
    username: "",
    email: "",
    password: "",
    status: "Customer"
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }
  onClick() {
      this.dataService.onRegister(this.newUser.name, this.newUser.username, this.newUser.email, this.newUser.password, this.newUser.status)
  }
}
