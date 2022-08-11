import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IUser } from '../interfaces/IUser';
import {ICategory} from "../interfaces/ICategory";
import {IProduct} from "../interfaces/IProduct";
import {ICartItem} from "../interfaces/ICartItem";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  createUser(name: string, username: string, email: string, password: string, status: string) {
    return this.httpClient.post(
      "http://localhost:8080/account/create",
      {name, username, email, password, status}
    ) as Observable<any>
  }

  login(username: string, password: string) {
    return this.httpClient.post(
      "http://localhost:8080/account/login",
      {username, password}
    ) as Observable<any>
  }

  displayProducts():Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      "http://localhost:8080/products"
    )
  }

  addItemToCart(id: number, cartId: number, productId: number, quantity: number){
    return this.httpClient.post(
      "http://localhost:8080/items",
      {id, cartId, productId, quantity}
    ) as Observable<ICartItem>
  }

  displayCartItemList(id: number){
    return this.httpClient.post(
      "http://localhost:8080/carts",
      {id}
    )
  }

  // CATEGORIES
  GET_CATEGORIES():Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>("http://localhost:8080/Category")
  }
}
