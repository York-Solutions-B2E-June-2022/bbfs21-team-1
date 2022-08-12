import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICartItem} from "../../interfaces/ICartItem";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: ICartItem;

  @Output() onCountChange = new EventEmitter();

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
  }

  countChange(quantity: number) {
    this.httpService.countChange(quantity, this.cartItem.id).pipe(first()).subscribe({
      next: value => {
        this.onCountChange.emit()
      }
    });
  }

  ngOnInit(): void {
  }

}
