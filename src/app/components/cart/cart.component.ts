import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPriceValue: number = 0;
  buyerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
  });


  constructor(private cartService: CartService, private router: Router) { }
  @Output() formEmit = new EventEmitter<FormGroup>();
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartItems = this.cartService.cartItems;
    this.computeCartTotal();
  }

  change(product: Product) {
    if (product.numberItem < 1) {
      this.removeProduct(product);
    }
    this.computeCartTotal();
  }


  computeCartTotal() {
    this.totalPriceValue = 0;
    this.cartItems.forEach(product => {
      this.totalPriceValue += product.numberItem * product.price;
    })
    this.cartService.totalPrice = this.totalPriceValue;
  }

  removeProduct(product: Product) {
    const index = this.cartItems.indexOf(product);
    this.cartItems.splice(index, 1);
    this.computeCartTotal();
  }

  onSubmit() {
    this.cartService.buyerForm = this.buyerForm;
    this.router.navigate(['/confirmation']);
  }

}
