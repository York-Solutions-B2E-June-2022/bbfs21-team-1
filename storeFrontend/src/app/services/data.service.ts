import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {Router} from "@angular/router";
import {ICategory} from "../interfaces/ICategory";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser: IUser|null = null
  currentUser$ = new Subject<IUser | null>();

  //SHOPKEEPER Edit Variables
  categoryToEdit:ICategory|null = null
  //ADMIN Edit Variables
  userToEdit:IUser|null = null

  loginError!: string;
  registrationError!: string;

  constructor(private httpService: HttpService, private router:Router) {
  }

  onRegister(name: string, username: string, email: string, password: string, status: string) {
    this.httpService.createUser(name, username, email, password, status).pipe(first()).subscribe({
      next: (data) => {
        this.currentUser = data
        this.currentUser$.next(data)
        console.log(this.currentUser)
        this.router.navigate(["/"])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onLogin(username: string, password: string): string | void {
    this.httpService.login(username, password).pipe(first()).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.currentUser$.next(this.currentUser);
        console.log(this.currentUser)
        this.router.navigate(["/"])
      },
      error: (loginError) => {
        loginError = "Username and/or password incorrect."
        this.loginError = loginError;
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
     error: (registrationError) => {
       registrationError = "Registration unsuccessful. No fields may be left blank."
       this.registrationError = registrationError;
     }
   })
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
  SET_CATEGORY_EDIT(category:ICategory|null = null){
    this.categoryToEdit = category
  }

  //ADMIN User Edit Functions
  SET_USER_EDIT(user:IUser|null = null){
    this.userToEdit = user
  }

}
