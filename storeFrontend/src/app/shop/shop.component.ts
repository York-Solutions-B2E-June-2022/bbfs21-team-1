import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {HttpService} from "../services/http.service";
import {first} from "rxjs";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  productList: any

  constructor(private dataService: DataService, private httpService: HttpService) {
    httpService.displayProducts().pipe(first()).subscribe({
        next: (data) => {
          this.productList = data;
        },
        error: (error) => {
          console.error(error)
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
