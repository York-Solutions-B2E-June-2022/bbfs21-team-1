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

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    if ( !this.dataService.currentUser ) {
      this.dataService.ADD_TO_GUEST_CART({
        cart:{},
        id: new Date().getTime(),
        product: this.product,
        quantity: 1,
        pastOrder: false
      })
    } else {
      this.dataService.addToCart(this.dataService.currentUser!.id!, this.product.id);
    }
  }
}
