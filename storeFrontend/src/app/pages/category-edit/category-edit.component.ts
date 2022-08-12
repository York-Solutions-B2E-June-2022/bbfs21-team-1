import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {ICategory} from "../../interfaces/ICategory";
import { Router } from "@angular/router";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  isEditing:boolean = false
  error:string = ""
  success:string = ""
  category:ICategory = {
    id: undefined,
    name: ""
  }

  constructor(private httpService:HttpService, private dataService:DataService, private router:Router) {
    if (!dataService.currentUser) {this.router.navigate([""])}
    if (dataService.categoryToEdit) {
      this.isEditing = true
      this.category = dataService.categoryToEdit
    }
    this.httpService.displayProducts().pipe(first()).subscribe({
      next: value => {
        let products = value.filter((product) => product.category.name === this.category.name)
        if ( products.length !== 0 ) {
          this.error = `${products.length} product(s) use this category.`
        } else {
          this.error = ""
        }
      }
    })
  }

  ngOnInit(): void {
  }

  onSave(){
    if (this.category.name) {
      if (this.isEditing) {
        this.httpService.EDIT_CATEGORY(this.category).pipe(first()).subscribe({
          next: () => this.success = "Category Updated"
        })
        this.onCancel()
      } else {
        this.httpService.CREATE_CATEGORY(this.category.name).pipe(first()).subscribe({
          next: () => this.success = "Category Created!"
        })
      }
      this.error = ""
      this.category = {id: undefined, name: ""}
      this.isEditing = false
      setTimeout(()=>{ this.success = "" }, 2500)
    } else {
      this.error = "Field cannot be empty"
    }
  }
  onDelete(){
    this.httpService.DELETE_CATEGORY(this.category.id!).pipe(first()).subscribe({
      next: () => this.router.navigate(["/categories"])
    })

  }
  onCancel() {
    this.dataService.SET_CATEGORY_EDIT()
  }

}
