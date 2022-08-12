import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {first} from "rxjs";
import {ICategory} from "../../interfaces/ICategory";
import {IProduct} from "../../interfaces/IProduct";
import {calcProjectFileAndBasePath} from "@angular/compiler-cli";

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {
  isEditing:boolean = false
  error:string = ""
  success:string = ""
  tempProduct:IProduct = this.resetFields()
  categoryList:ICategory[] = []

  constructor(private httpService:HttpService, private dataService:DataService, private router:Router) {
    if (!dataService.currentUser) {this.router.navigate([""])}
    httpService.GET_CATEGORIES().pipe(first()).subscribe({
      next: value => {
        this.categoryList = value
        this.tempProduct.category.name = this.categoryList[0].name
        if (dataService.productToEdit) {
          this.isEditing = true
          this.tempProduct = dataService.productToEdit
          console.log(this.tempProduct)
        }
      },
      error: err => {}
    })
  }

  ngOnInit(): void {
  }
  onDelete(){
    this.httpService.DELETE_PRODUCT(this.tempProduct.id).pipe(first()).subscribe({
      next: () => this.router.navigate(["/inventory"])
    })
  }
  onAvailChange(newDate:string){
    this.tempProduct.available = newDate
  }
  onDateChange(newDate:string){
    this.tempProduct.saleDate = newDate
  }

  emptyCheck():boolean{
    for (const prop in this.tempProduct){
      // @ts-ignore
      if (this.tempProduct[prop] === "") {
        // @ts-ignore
        console.error(`${prop} is empty`)
        this.error = "Fields cannot be empty"
        return true
      }
      if ( this.tempProduct.retailPrice < this.tempProduct.mapPrice ) {
        this.error = "Retail price cannot be lower than MAP"
        return true
      }
    }
    this.error = ""
    return false
  }

  onSave(){
    if ( !this.emptyCheck() ){
      if (this.isEditing) {
        this.httpService.EDIT_PRODUCT(this.tempProduct).pipe(first()).subscribe({
          next: value => this.success = "Product Updated!"
        })
        this.onCancel()
      } else {
        this.httpService.CREATE_PRODUCT(this.tempProduct).pipe(first()).subscribe({
          next: () => this.success = "Product Created!",
          error: err => console.log(err.error.message)
        })
      }
      this.router.navigate(["/inventory"])
      this.tempProduct = this.resetFields()
      setTimeout(()=>{ this.success = "" }, 2500)
    }
  }

  onCancel(){
    this.dataService.SET_PRODUCT_EDIT()
  }
  resetFields(){
    return {
      id: 0,
      imgUrl: undefined,
      name: "",
      description: "",
      available: "",
      category:{id:undefined, name:""},
      mapPrice: 0.00,
      mapDate: undefined,
      retailPrice: 0.00,
      retailDate: undefined,
      salePrice: 0.00,
      saleDate: "",
      discontinued: false
    }
  }

}
