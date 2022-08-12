import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {first} from "rxjs";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {IUser} from "../../interfaces/IUser";

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
  status: string = "Customer"
  currentUser: IUser | null = null
  error!: string;

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegister(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.createUser(name, username, email, password, status).pipe(first()).subscribe({
      next: (data) => {
        this.dataService.setCurrentUser(data);
        this.router.navigate(["/"])
      },
      error: () => {
        this.error = "Registration unsuccessful. Please complete all fields."
      }
    })
  }
}
