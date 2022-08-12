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
  //USERS
  GET_ALL_USERS():Observable<IUser[]>{
    return this.httpClient.get<IUser[]>("http://localhost:8080/account")
  }
  createUser(name: string, username: string, email: string, password: string, status: string) {
    return this.httpClient.post(
      "http://localhost:8080/account/create",
      {name, username, email, password, status}
    ) as Observable<any>
  }
  EDIT_USER(userObject:IUser){
    return this.httpClient.put('http://localhost:8080/account/edit', {...userObject})
  }

  DELETE_USER(id:number){
    return this.httpClient.delete(`http://localhost:8080/account/${id}`)
  }

  login(username: string, password: string) {
    return this.httpClient.post(
      "http://localhost:8080/account/login",
      {username, password}
    ) as Observable<any>
  }

  editUser(name: string, username: string, email: string, password: string, status: string, id: number) {
    return this.httpClient.put(
      "http://localhost:8080/account/edit",
      {name, username, email, password, status, id}
    ) as Observable<any>
  }

  //PRODUCTS
  displayProducts():Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      "http://localhost:8080/products"
    )
  }

  addItemToCart(userId: number, productId: number){
    return this.httpClient.post(
      "http://localhost:8080/carts/add",
      {userId, productId}
    ) as Observable<ICartItem>
  }

  displayCartItemList(userId: number){
    return this.httpClient.get<ICartItem[]>(
      `http://localhost:8080/carts/${userId}`
    )
  }

  countChange(quantity: number, id: number){
    return this.httpClient.post("http://localhost:8080/items/edit",
      {quantity, id}
    )
  }
  CREATE_PRODUCT(productBody:IProduct){
    return this.httpClient.post('http://localhost:8080/products',{
      name: productBody.name,
      description: productBody.description,
      category: productBody.category.name,
      available: productBody.available,
      mapPrice: productBody.mapPrice,
      retailPrice: productBody.retailPrice,
      salePrice: productBody.salePrice,
      saleDate: productBody.saleDate
    })
  }
  EDIT_PRODUCT(productBody:IProduct){
    return this.httpClient.put('http://localhost:8080/products',{
      id: productBody.id,
      name: productBody.name,
      description: productBody.description,
      category: productBody.category.name,
      available: productBody.available,
      mapPrice: productBody.mapPrice,
      retailPrice: productBody.retailPrice,
      salePrice: productBody.salePrice,
      saleDate: productBody.saleDate,
      discontinued: productBody.discontinued
    })
  }
  DELETE_PRODUCT(productId:number){
    return this.httpClient.delete(`http://localhost:8080/products/${productId}`)
  }

  // CATEGORIES
  GET_CATEGORIES():Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>("http://localhost:8080/Category")
  }
  CREATE_CATEGORY(categoryName:string){
    return this.httpClient.post('http://localhost:8080/Category/create',{name:categoryName})
  }
  EDIT_CATEGORY(category:ICategory){
    return this.httpClient.put('http://localhost:8080/Category',{...category})
  }
  DELETE_CATEGORY(categoryId:number){
    return this.httpClient.delete(`http://localhost:8080/Category/${categoryId}`)
  }

}
