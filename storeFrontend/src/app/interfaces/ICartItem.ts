import {IProduct} from "./IProduct";

export interface ICartItem extends IProduct{
  //todo use this to tie to quantity counter in shopping cart
  price: number;
  count: number;
}
