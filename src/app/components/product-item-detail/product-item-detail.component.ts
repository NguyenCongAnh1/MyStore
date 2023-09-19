import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  productDetail?: Product;
  id: number = 0;
  numberItem: number = 1;
  constructor(private route: ActivatedRoute,
    private httpService: HttpService,
    private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getProductDetail();
  }
  async getProductDetail() {
    let id: number
    this.route.params.subscribe(params => {
      id = params['id'];
      console.log("id", id);

      this.httpService.getData().subscribe(data => {
        this.productDetail = data.find(product => product.id == id)
      })
    });
  }

  onNumberChange(product: Product) {
    product.numberItem = parseInt(this.numberItem.toString(),10);
  }
  addToCart(product: Product) {
    this.onNumberChange(product);
    this.cartService.addProductToCart(product);
    alert("Add product to cart!");
  }


}
