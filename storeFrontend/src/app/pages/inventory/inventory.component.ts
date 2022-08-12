import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {IProduct} from "../../interfaces/IProduct";
import {IUser} from "../../interfaces/IUser";
import {first} from "rxjs";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryList:IProduct[] = []

  constructor(private httpService:HttpService, private dataService:DataService, private router:Router) {
    if (!dataService.currentUser) { this.router.navigate([""]) }
    httpService.displayProducts().pipe(first()).subscribe({
      next: value => this.inventoryList = value
    })
  }

  ngOnInit(): void {
  }

  onEdit(product:IProduct){
    this.dataService.SET_PRODUCT_EDIT(product)
  }

}
