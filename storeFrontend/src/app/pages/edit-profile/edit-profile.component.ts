import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  name!: string;
  username!: string;
  email!: string;
  password!: string;
  status!: string;


  constructor(private dataService: DataService, private httpService: HttpService) {
    this.name = dataService.currentUser!.name
    this.username = dataService.currentUser!.username
    this.email = dataService.currentUser!.email
    this.password = dataService.currentUser!.password!
  }

  ngOnInit(): void {
  }

  onSave() {
    this.dataService.onSaveEdit(this.name, this.username, this.email, this.password, this.status)
  }
  // onEdit() {
  //   this.dataService.onEditProfile()
  // }
  onCancel() {
    this.dataService.onCancelEdit()
  }
  onDelete() {
    this.httpService.DELETE_USER(this.dataService.currentUser!.id!).pipe(first()).subscribe()

    console.log("Deleting User");
  }

}
