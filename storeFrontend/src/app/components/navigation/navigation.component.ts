import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  currentUser:IUser|null = null
  currentUserSUB:Subscription

  constructor(private service:DataService) {
    this.currentUser = service.currentUser
    this.currentUserSUB = service.currentUser$.subscribe((next) => {this.currentUser = next})
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.currentUserSUB.unsubscribe()
  }

}
