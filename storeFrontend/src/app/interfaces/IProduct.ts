import {ICategory} from "./ICategory";

export interface IProduct {
  id:number|null
  imgUrl: string;
  name: string;
  description: string;
  available: string;
  category: ICategory;
  mapPrice: number;
  mapDate: string
  retailPrice: number;
  retailDate:string
  salePrice: number;
  saleDate: Date;
  discontinued:boolean
}
