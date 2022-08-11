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

  id!: number;
  cartId!: number;
  productId!: number;
  quantity!: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onClick() {

    this.id = this.dataService.currentUser.id;

    //this.cartId = this.dataService.currentUser.cartId;
    this.productId = this.product.id;
    //todo fix hardcoding later - or always one and edit in cart?
    this.quantity = 1;
//todo wait on this for now
    this.dataService.addToCart(this.id, this.cartId, this.productId, this.quantity);
  }
}
