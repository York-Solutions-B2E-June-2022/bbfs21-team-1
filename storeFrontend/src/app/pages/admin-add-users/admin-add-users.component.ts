import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {IUser} from "../../interfaces/IUser";
import {first} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-add-users',
  templateUrl: './admin-add-users.component.html',
  styleUrls: ['./admin-add-users.component.css']
})
export class ADMINAddUsersComponent implements OnInit {
  isEditing:boolean = false
  error:string = ""
  success:string = ""
  newUser:any = {
    id: undefined,
    name: "",
    username: "",
    email: "",
    password: "",
    status: ""
  }

  constructor(private httpService:HttpService, private dataService:DataService) {
    if (dataService.userToEdit) {
      this.isEditing = true
      this.newUser = dataService.userToEdit
    }
  }

  ngOnInit(): void {
  }

  emptyCheck():boolean{
    for (const prop in this.newUser){
      if (this.newUser[prop] == "") {
        this.error = "Fields cannot be empty"
        return true
      }
    }
    this.error = ""
    return false
  }

  onSave(){
    if ( !this.emptyCheck() ){
      if (this.isEditing) {
        this.httpService.EDIT_USER(this.newUser).pipe(first()).subscribe({
          next: () => this.success = "User Updated!",
          error: err => console.error(err)
        })
        this.dataService.SET_USER_EDIT()
      } else {
        this.httpService.createUser(
            this.newUser.name,
            this.newUser.username,
            this.newUser.email,
            this.newUser.password,
            this.newUser.status
        ).pipe(first()).subscribe({
          next: () => { this.success = "User Created!" }
        })
      }
      this.newUser = {
        name: "",
        username: "",
        email: "",
        password: "",
        status: ""
      }
      setTimeout(()=>{ this.success = "" }, 5000)
    }
  }

}
