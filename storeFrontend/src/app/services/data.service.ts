import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {IProduct} from "../interfaces/IProduct";
import {ICartItem} from "../interfaces/ICartItem";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IUser;
  currentUser!: IUser;
  currentUser$ = new Subject<IUser | null>();
  cartItemList: Array<ICartItem> = []; //todo pull from http service here

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
  }

  onLogin(username: string, password: string) {
    this.httpService.login(username, password).pipe(first()).subscribe({
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

  onLogout() {
    this.currentUser$.next(null);
  }

  addToCart() {
    //logic here to add item to cart - tie to http service?
  }


}
