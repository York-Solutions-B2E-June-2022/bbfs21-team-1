import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: IUser

  constructor(private dataService: DataService) {
    this.currentUser = dataService.currentUser;
  }

  ngOnInit(): void {
  }

  onClick(){
    this.dataService.onLogout();
  }

}
