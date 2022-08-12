import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!: string;
  username!: string;
  email!: string;
  password!: string;
  status:string = "Customer"


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }

  onClick() {
    this.dataService.onRegister(this.name, this.username, this.email, this.password, this.status);

  }
}
