import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import {first, Subscription} from "rxjs";
import {IProduct} from "../../interfaces/IProduct";
import {IUser} from "../../interfaces/IUser";
import {ICartItem} from "../../interfaces/ICartItem";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItem!: ICartItem;
  cartItemList!: Array<ICartItem>
  //cartItemList$: Subscription;

  //todo add correct tax rate
  taxRate: number = 0.07;

  cartSubtotal: number = 0;
  taxCost: number = 0;
  shippingCost: number = 0;
  cartTotal: number = 0;

  id!: number

  //todo coupon discount
  //todo sale discount


  constructor(private dataService: DataService, private httpService: HttpService) {
    this.id = dataService.currentUser.id!;
    httpService.displayCartItemList(this.id).pipe(first()).subscribe({
      next: (data) => {
        this.cartItemList = data;
        console.log(data);
        this.updateTotals();
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  updateTotals() {
    console.log("hello world");
    this.cartSubtotal = 0;

    this.cartItemList.forEach((i) => {
      this.cartSubtotal += i.product.retailPrice * i.quantity;
    })

    this.taxCost = this.cartSubtotal * this.taxRate;
    this.shippingCost = 10; //todo change this $10 flat test rate later
    this.cartTotal = this.cartSubtotal + this.taxCost + this.shippingCost;
  }

  ngOnInit(): void {
  }
}
