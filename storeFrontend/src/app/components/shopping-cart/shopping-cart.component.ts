import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  //todo fix any type???
  cartItemList: any

  //todo add correct tax rate
  taxRate: number = 0.07;

  cartSubtotal: number = 0;
  taxCost: number = 0;
  shippingCost: number = 0;
  cartTotal: number = 0;

  constructor(private dataService: DataService, private httpService: HttpService) {
    httpService.displayCartItemList().pipe(first()).subscribe({
      next: (data) => {
        this.cartItemList = data;
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  ngOnInit(): void {}

}
