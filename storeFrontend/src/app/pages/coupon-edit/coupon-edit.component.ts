import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {ICoupon} from "../../interfaces/ICoupon";
import {first} from "rxjs";

@Component({
	selector: 'app-coupon-edit',
	templateUrl: './coupon-edit.component.html',
	styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit {
	isEditing: boolean = false
	error: string = ""
	success: string = ""
	tempCoupon:ICoupon = this.resetFields()


	constructor(private httpService: HttpService, private dataService: DataService, private router: Router) {
		if (!dataService.currentUser) {this.router.navigate([""])}
		if (dataService.couponToEdit) {
			this.isEditing = true
			this.tempCoupon = dataService.couponToEdit
		}
	}

	ngOnInit(): void {
	}
	onDelete(){
		this.httpService.DELETE_COUPON(this.tempCoupon.id).pipe(first()).subscribe({
			next: () => this.router.navigate(["/coupons"])
		})
	}
	onCancel(){
		this.dataService.SET_COUPON_EDIT()
		this.router.navigate(["/coupons"])
	}
	onDateChange(newDate:string){
		this.tempCoupon.goodUntil = newDate
	}
	onSave(){
		if ( !this.emptyCheck() ){
			if (this.isEditing) {
				this.httpService.EDIT_COUPON(this.tempCoupon).pipe(first()).subscribe({
					next: () => this.success = "Coupon Updated!"
				})
				this.onCancel()
			} else {
				this.httpService.CREATE_COUPONS(this.tempCoupon).pipe(first()).subscribe({
					next: () => this.success = "Coupon Created!",
					error: err => console.log(err.error.message)
				})
			}
			this.tempCoupon = this.resetFields()
			setTimeout(()=>{ this.success = "" }, 2500)
		}
	}
	resetFields():ICoupon{
		return {
			id: 0,
			label: "",
			couponCode: "",
			discount: 0,
			useLimit: 0,
			goodUntil: ""
		}
	}
	emptyCheck():boolean{
		for (const prop in this.tempCoupon){
			// @ts-ignore
			if (this.tempCoupon[prop] === "") {
				// @ts-ignore
				console.error(`${prop} is empty`)
				this.error = "Fields cannot be empty"
				return true
			}
		}
		this.error = ""
		return false
	}

}