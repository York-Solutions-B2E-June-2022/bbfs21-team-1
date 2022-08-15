import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {ICategory} from "../interfaces/ICategory";
import {IProduct} from "../interfaces/IProduct";
import {ICartItem} from "../interfaces/ICartItem";
import {ICoupon} from "../interfaces/ICoupon";

@Injectable({
	providedIn: 'root'
})
export class DataService {

	currentUser: IUser | null = null
	currentUser$ = new Subject<IUser | null>();

	//SHOPKEEPER Edit Variables
	categoryToEdit: ICategory | null = null
	productToEdit: IProduct | null = null
    couponToEdit: ICoupon | null = null

	//ADMIN Edit Variables
	userToEdit: IUser | null = null

	//GUEST Variables
	guestCart: ICartItem[] = []

	constructor(private httpService: HttpService) {
	}

	setCurrentUser(user: IUser) {
		this.currentUser = user;
		this.currentUser$.next(this.currentUser);
	}

	onLogout() {
		this.currentUser = null;
		this.currentUser$.next(this.currentUser);
	}
	addToCart(userId: number, productId: number,) {
		this.httpService.addItemToCart(userId, productId).pipe(first()).subscribe({
			next: () => {
			},
			error: (error) => {
				console.error(error)
			}
		})
	}
    ADD_TO_GUEST_CART(cartItem:ICartItem){
		this.guestCart.push(cartItem)
    }
	REMOVE_FROM_GUEST_CART(cartItemId:number){
		this.guestCart = this.guestCart.filter((item) => item.id !== cartItemId)
	}

	// Edit-Profile functions
	onSaveEdit(name: string, username: string, email: string, password: string, status: string) {
		this.httpService.editUser(name, username, email, password, status, this.currentUser!.id!).pipe(first()).subscribe({
			next: (data) => {
				this.currentUser = data;
				this.currentUser$.next(this.currentUser);
			},
			error: (error) => {
				console.error(error)
			}
		})
	}

	//SHOPKEEPER FUNCTIONS
	SET_CATEGORY_EDIT(category: ICategory | null = null) {
		this.categoryToEdit = category
	}
	SET_PRODUCT_EDIT(product: IProduct | null = null) {
		this.productToEdit = product
	}
    SET_COUPON_EDIT(coupon:ICoupon | null = null){
        this.couponToEdit = coupon
    }

	//ADMIN User Edit Functions
	SET_USER_EDIT(user: IUser | null = null) {
		this.userToEdit = user
	}

}
