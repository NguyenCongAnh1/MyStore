import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  buyerFormConfirmation?: FormGroup
  totalPrice: number = 0;
  constructor(private cartService: CartService){
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.buyerFormConfirmation = this.cartService.buyerForm;
    this.totalPrice = this.cartService.totalPrice;
  }

}
