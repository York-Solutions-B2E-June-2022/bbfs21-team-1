import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IProduct} from "../../interfaces/IProduct";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: IProduct;

  constructor(private dataService: DataService) { }

  productName!: string;
  productCategory!: string;
  productPrice!: string;

  ngOnInit(): void {
  }

  onClick(){
    this.dataService.addToCart();
  }
}
