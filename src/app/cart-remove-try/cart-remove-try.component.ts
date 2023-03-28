import { Component, OnInit } from '@angular/core';
import { cart } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-cart-remove-try',
  templateUrl: './cart-remove-try.component.html',
  styleUrls: ['./cart-remove-try.component.css'],
})
export class CartRemoveTryComponent implements OnInit {
  cartData: any | undefined;

  constructor(private serviceForGetata: SellerAddProductService) {}

  ngOnInit(): void {
    this.serviceForGetata.productList().subscribe((result) => {
      this.cartData = result;
      localStorage.setItem("cart",JSON.stringify(this.cartData))
    });
  }

  // removeItem(id:any) {
  //   console.log('idddddddddddd',id);
  //   if (localStorage.getItem('cart')||{}) {
  //     console.log('iddddd', id);
  //     this.serviceForGetata.mRm(id);
  //   }
  // }
}
