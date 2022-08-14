import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";
import { Router } from "@angular/router";
import {first, Subscription} from "rxjs";
import {IProduct} from "../../interfaces/IProduct";
import {IUser} from "../../interfaces/IUser";
import {ICartItem} from "../../interfaces/ICartItem";
import {ICoupon} from "../../interfaces/ICoupon";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItemList!: Array<ICartItem>
  couponList:ICoupon[] = []
  selectedCoupon:ICoupon|null = null
  discount!:null|number
  checkedOut:boolean = false
  currentUser:IUser|null = this.dataService.currentUser

  taxRate: number = 0.07;
  cartSubtotal: number = 0;
  taxCost: number = 0;
  shippingCost: number = 0;
  cartTotal: number = 0;


  constructor(private dataService: DataService, private httpService: HttpService, private router:Router) {
    if ( dataService.currentUser ) {
      this.updateList()
    } else {
      this.cartItemList = dataService.guestCart
      this.updateTotals()
    }
    this.httpService.GET_COUPONS().pipe(first()).subscribe(
        {next: value => {
            this.couponList = value.filter((c) => c.useLimit !== 0)
            console.log(value)
          }}
    )
  }

  updateList(){
    if (!this.currentUser){
      this.cartItemList = this.dataService.guestCart
      this.updateTotals()
      return
    }
    this.httpService.displayCartItemList(this.dataService.currentUser?.id!).pipe(first()).subscribe({
      next: (data) => {
        this.cartItemList = data.filter((item) => !item.pastOrder);
        this.updateTotals();
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  updateTotals() {
    this.cartSubtotal = 0;

    this.cartItemList.forEach((i) => {
      this.cartSubtotal += i.product.retailPrice * i.quantity;
    })

    this.taxCost = this.cartSubtotal * this.taxRate;
    this.shippingCost = this.cartSubtotal > 100 ? 0 : 10;
    this.cartTotal = this.cartSubtotal + this.taxCost + this.shippingCost;
    if ( this.selectedCoupon ) {
      this.cartTotal -= this.cartTotal * this.selectedCoupon.discount
    }
  }

  ngOnInit(): void {
  }
  setCoupon(couponLabel:string){
    this.selectedCoupon = this.couponList.find(c => c.label === couponLabel)!
    this.discount = this.cartTotal * this.selectedCoupon.discount
    this.updateTotals()
  }
  onCheckout(){
    if ( !this.dataService.currentUser ) {
      this.router.navigate(["/signup"])
      return
    }
    this.cartItemList.forEach((item) => {
      this.httpService.SET_PURCHASED(item.id).pipe(first()).subscribe({
        next: () => this.updateList()
      })
    })
    this.checkedOut = true
  }
}
