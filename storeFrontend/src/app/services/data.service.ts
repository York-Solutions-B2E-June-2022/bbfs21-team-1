import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {ICartItem} from "../interfaces/ICartItem";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IUser;
  currentUser!: IUser;
  currentUser$ = new Subject<IUser | null>();
  cartItem!: ICartItem;
  cartItemList: Array<ICartItem> = []; //todo pull from http service here

  //ADMIN User Edit Variables
  userToEdit:IUser|null = null
  // userToEdit$ = new Subject<IUser>()

  constructor(private httpService: HttpService) {
  }

  onRegister(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.createUser(name, username, email, password, status).pipe(first()).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error(error)
      }
    })
    console.log("account created successfully");
  }

  onLogin(username: string, password: string) {
    this.httpService.login(username, password).pipe(first()).subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
        this.currentUser = this.user;
        this.currentUser$.next(this.currentUser);
      },
      error: (error) => {
        console.error(error)
      }
    })
    console.log(this.user);
    console.log(this.currentUser);
    console.log(this.currentUser$);
    console.log("test");
  }

  onLogout() {
    this.currentUser$.next(null);
  }

  addToCart(id: number, cartId: number, productId: number, quantity: number) {
   this.httpService.addItemToCart(id, cartId, productId, quantity).pipe(first()).subscribe({
     next: (data) => {
       this.cartItem = data;
     },
     error: (error) => {
       console.error(error)
     }
   })
  }

  // Edit-Profile functions

  onSaveEdit(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.editUser(name, username, email, password, status, this.currentUser.id).pipe(first()).subscribe({
      next: (data) => {
        this.user = data;
        this.currentUser = this.user;
        this.currentUser$.next(this.currentUser);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  // onEditProfile() {
  // }

  onCancelEdit() {

  }
  onDeleteProfile() {

  }

  //ADMIN User Edit Functions
  SET_USER_EDIT(user:IUser|null = null){
    this.userToEdit = user
    // this.currentUser$.next(user)
  }

}
