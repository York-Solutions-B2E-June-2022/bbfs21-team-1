import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";
import {IProduct} from "../../interfaces/IProduct";
import {ICategory} from "../../interfaces/ICategory";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //TODO fix any type???
  // I fixed!! -Dan
  MASTER_PRODUCT_LIST:IProduct[] = []
  filteredList:IProduct[] = []

  categoryList:ICategory[] = []
  filter:string = "All"

  constructor(private dataService: DataService, private httpService: HttpService) {
    httpService.displayProducts().pipe(first()).subscribe({
      next: (data) => {this.MASTER_PRODUCT_LIST = data; this.filteredList = data},
      error: (error) => {console.error(error)}
    })
    httpService.GET_CATEGORIES().pipe(first()).subscribe({
      next: value => {this.categoryList = value},
      error: err => {}
    })
  }
  onFilterChange(query:string):void{
    this.filter = query;
    if (this.filter !== "All") {
      this.filteredList = this.MASTER_PRODUCT_LIST.filter((p) => p.category.name === this.filter)
    }
  }

  ngOnInit(): void {}

}
