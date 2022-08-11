import {IProduct} from "./IProduct";

export interface ICartItem {
  cart: {};
  id: number;
  pastOrder: boolean;
  product: IProduct;
  quantity: number;
}
