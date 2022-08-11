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

  userId!: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.userId = this.dataService.currentUser.id!;
    this.dataService.addToCart(this.userId, this.product.id);
    console.log(this.userId, this.product.id)
  }
}
