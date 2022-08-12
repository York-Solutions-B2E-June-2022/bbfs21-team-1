import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";
import {Router} from "@angular/router";

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


  constructor(private dataService: DataService, private httpService: HttpService, private router:Router) {
    if ( !dataService.currentUser ) { this.router.navigate([""]) }
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
  onDelete() {
    this.httpService.DELETE_USER(this.dataService.currentUser!.id!).pipe(first()).subscribe()
    this.dataService.onLogout()
  }

}
