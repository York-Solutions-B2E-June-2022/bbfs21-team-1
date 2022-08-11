import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {IUser} from "../../interfaces/IUser";
import {first} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class ADMINUsersComponent implements OnInit {

  userList:IUser[] = []

  constructor(private httpService:HttpService, private dateService:DataService) {
    httpService.GET_ALL_USERS().pipe(first()).subscribe({
      next: value => this.userList = value,
      error: err => console.error(err)
    })
  }

  ngOnInit(): void {
  }
  onEdit(user:IUser){
    this.dateService.SET_USER_EDIT(user)
  }

}
