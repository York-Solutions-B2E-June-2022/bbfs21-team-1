import {ICategory} from "./ICategory";

export interface IProduct {
  id: number;
  imgUrl: string|undefined;
  name: string;
  description: string;
  available: string;
  category: ICategory;
  mapPrice: number;
  mapDate: string|undefined;
  retailPrice: number;
  retailDate:string|undefined
  salePrice: number;
  saleDate: string;
  discontinued:boolean;
}
