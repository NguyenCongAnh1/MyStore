import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];
  buyerForm?: FormGroup;
  totalPrice: number = 0;

  constructor() { }

  addProductToCart(product: Product){
    const existedProductIndex = this.cartItems.findIndex(p => p.id === product.id);
    if(existedProductIndex != -1){
      this.cartItems[existedProductIndex].numberItem += product.numberItem;
      console.log(this.cartItems[existedProductIndex].numberItem);
    }else{
      this.cartItems.push(product);
    }
    console.log(this.cartItems);
  }

}
