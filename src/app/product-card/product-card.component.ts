import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-Actions') showActions = true;

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    console.log("qq");
  }

}
