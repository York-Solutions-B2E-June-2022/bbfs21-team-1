import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

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


  constructor(private dataService: DataService) {
    this.name = dataService.currentUser.name
    this.username = dataService.currentUser.username
    this.email = dataService.currentUser.email
    this.password = dataService.currentUser.password!

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
    this.dataService.onDeleteProfile()
  }

}
