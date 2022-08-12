import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {ICategory} from "../../interfaces/ICategory";

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

  constructor(private httpService:HttpService, private dataService:DataService) {
    if (dataService.categoryToEdit) {
      this.isEditing = true
      this.category = dataService.categoryToEdit
    }
  }

  ngOnInit(): void {
  }

  onSave(){
    if (this.category.name) {
      if (this.isEditing) {
        //edit cat function
        this.onCancel()
      } else {
        this.httpService.CREATE_CATEGORY(this.category.name).pipe(first()).subscribe({
          next: () => this.success = "Category Created!"
        })
      }
      this.category = {id: undefined, name: ""}
      setTimeout(()=>{ this.success = "" }, 2500)
    }
  }
  onDelete(){
  }
  onCancel() {
    this.dataService.SET_CATEGORY_EDIT()
  }

}
