import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {Router} from "@angular/router";
import {ICartItem} from "../interfaces/ICartItem";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ICategory} from "../interfaces/ICategory";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IUser;

  // currentUser: IUser = {
  //   id: 20,
  //   username: "user1",
  //   name: "Kelsey J",
  //   password: "pass",
  //   email: "email@email.com",
  //   status: "Admin"
  // }
  currentUser: IUser|null = null
  currentUser$ = new Subject<IUser | null>();

  //SHOPKEEPER Edit Variables
  categoryToEdit:ICategory|null = null
  //ADMIN Edit Variables
  userToEdit:IUser|null = null

  constructor(private httpService: HttpService, private router:Router) {
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
  }

  onLogin(username: string, password: string) {
    this.httpService.login(username, password).pipe(first()).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.currentUser$.next(this.currentUser);
        console.log(this.currentUser)
        this.router.navigate(["/"])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onLogout() {
    this.currentUser = null;
    this.currentUser$.next(this.currentUser);
  }

  addToCart(userId: number, productId: number,) {
   this.httpService.addItemToCart(userId, productId).pipe(first()).subscribe({
     next: (data) => {
       //this.cartItem = data;
     },
     error: (error) => {
       console.error(error)
     }
   })
  }

  // Edit-Profile functions

  onSaveEdit(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.editUser(name, username, email, password, status, this.currentUser!.id!).pipe(first()).subscribe({
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

  //SHOPKEEPER FUNCTIONS
  SET_CATEGORY_EDIT(category:ICategory|null = null){
    this.categoryToEdit = category
  }

  //ADMIN User Edit Functions
  SET_USER_EDIT(user:IUser|null = null){
    this.userToEdit = user
  }

}
