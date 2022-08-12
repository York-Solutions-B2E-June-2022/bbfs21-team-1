import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ICartItem} from "../../interfaces/ICartItem";
import {IProduct} from "../../interfaces/IProduct";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {

  cartItemList!: Array<ICartItem>


  constructor(private dataService: DataService, private httpService: HttpService) {
    httpService.displayCartItemList(dataService.currentUser?.id!).pipe(first()).subscribe({
      next: (value) => {
        this.cartItemList = value.filter((i)=>i.pastOrder)
        console.log(this.cartItemList)
        console.log(value)
      }
    })

  }

  ngOnInit(): void {
  }

}
