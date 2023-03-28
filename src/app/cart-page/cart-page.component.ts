import { Component, OnInit } from '@angular/core';
import { cart, pricesummary } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  pricesummary: pricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: SellerAddProductService) {}

  ngOnInit(): void {
    this.product.cartDetailsList().subscribe((result) => {
      this.cartData = result;
      let getPrice = 0;

      result.forEach((item) => {
        if (item.productQuantity) {
          getPrice = getPrice + +item.productPrice * +item.productQuantity;
        }
      });
      console.log('priceeee', getPrice);
      this.pricesummary.price = getPrice;
      this.pricesummary.discount = Math.ceil(getPrice / 9);
      this.pricesummary.tax = Math.ceil(getPrice / 3) / 100;
      this.pricesummary.delivery = 20;
      this.pricesummary.total = Math.ceil(
        this.pricesummary.price -
          this.pricesummary.discount +
          this.pricesummary.tax +
          this.pricesummary.delivery
      );
      console.log('ftotal price:::::', this.pricesummary.total);
    });
  }
}
