import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router, private service:DataService) {
    if (service.currentUser !== null){
      console.log(service.currentUser, "cant sign in")
      router.navigate([""])
    }
  }

  ngOnInit(): void {
  }

}
