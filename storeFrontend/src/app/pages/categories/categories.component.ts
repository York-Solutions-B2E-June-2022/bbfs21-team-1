import { Component, OnInit } from '@angular/core';
import {ICategory} from "../../interfaces/ICategory";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {first} from "rxjs";
import { Router } from "@angular/router";
import {IUser} from "../../interfaces/IUser";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryList:ICategory[] = []

  constructor(private httpService:HttpService, private dateService:DataService, private router:Router) {
    if ( !dateService.currentUser ) { this.router.navigate([""]) }
    httpService.GET_CATEGORIES().pipe(first()).subscribe({
      next: value => {this.categoryList = value},
      error: err => {}
    })
  }

  ngOnInit(): void {
  }

  onEdit(category:ICategory){
    this.dateService.SET_CATEGORY_EDIT(category)
  }

}
