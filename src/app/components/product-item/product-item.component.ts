import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() productList: Product[] = [];
  productAddToCart!: Product;
  numberItem: number = 1;
  constructor(private httpService: HttpService,
    private cartService: CartService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProductList();
    this.productList.forEach(product => {
      product.numberItem = 1;
    })
  }

  getProductList() {
    this.httpService.getData().subscribe(data => {
      this.productList = data;
    })
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
