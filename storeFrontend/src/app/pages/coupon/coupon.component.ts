import { Component, OnInit } from '@angular/core';
import {ICoupon} from "../../interfaces/ICoupon";
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  couponList:ICoupon[] = []

  constructor(private httpService:HttpService, private dataService:DataService, private router:Router) {
    if (!dataService.currentUser) { this.router.navigate([""]) }
    httpService.GET_COUPONS().pipe(first()).subscribe({
      next: value => {
        console.log(value)
        this.couponList = value
      }
    })
  }

  ngOnInit(): void {
  }
  onEdit(coupon:ICoupon){
    this.dataService.SET_COUPON_EDIT(coupon)
  }

}
