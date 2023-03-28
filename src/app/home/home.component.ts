import { Component, OnInit } from '@angular/core';
import { Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private carosuleProduct: SellerAddProductService) {}
  popularProducts: undefined | Product[];
  trandyProductsforhome:undefined| Product[]
  ngOnInit(): void {
    this.carosuleProduct.popularProduct().subscribe((data) => {
      console.log(data);
      this.popularProducts = data
    });
    this.carosuleProduct.trandyProducts().subscribe((data) => {
      console.log(data);
      this.trandyProductsforhome = data
    });
  }


}
