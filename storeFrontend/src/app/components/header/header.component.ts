import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: IUser|null
  currentUserSub: Subscription

  constructor(private dataService: DataService) {
    this.currentUser = this.dataService.currentUser;
    this.currentUserSub = dataService.currentUser$.subscribe( (user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
       this.currentUserSub.unsubscribe();
    }

  ngOnInit(): void {
  }

  onClick(){
    this.dataService.onLogout();
  }

}
