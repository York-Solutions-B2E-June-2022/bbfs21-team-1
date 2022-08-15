import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICartItem} from "../../interfaces/ICartItem";
import {HttpService} from "../../services/http.service";
import {first} from "rxjs";
import {IUser} from "../../interfaces/IUser";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: ICartItem;
  @Output() onCountChange = new EventEmitter();
  @Output() ON_ORDER_AGAIN = new EventEmitter()
  @Output() ON_REMOVAL = new EventEmitter()
  currentUser:IUser|null = null

  constructor(private httpService: HttpService, private dataService:DataService) {
    this.currentUser = dataService.currentUser
  }

  countChange(quantity: number) {
    this.httpService.countChange(quantity, this.cartItem.id).pipe(first()).subscribe({
      next: value => {
        this.onCountChange.emit()
      }
    });
  }
  onOrderAgain(cartItemId:number){
    this.ON_ORDER_AGAIN.emit(cartItemId)
  }
  onRemove(cartItemId:number){
    if ( !this.currentUser ){
      this.dataService.REMOVE_FROM_GUEST_CART(cartItemId)
      this.ON_REMOVAL.emit()
      return
    }
    this.httpService.REMOVE_FROM_CART(cartItemId).pipe(first()).subscribe({
      next: value => this.ON_REMOVAL.emit()
    })
  }

  ngOnInit(): void {
  }

}
