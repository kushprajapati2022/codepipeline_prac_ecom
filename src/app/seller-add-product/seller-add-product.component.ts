import { Component } from '@angular/core';
import { Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  productMessage:string|undefined
  constructor(private addProductService:SellerAddProductService){}

  addProductData(data: Product) {
    console.log('add product data', data);
    this.addProductService.addProduct(data).subscribe((result)=>{
      console.log("add product result",result)
      if(result){
        this.productMessage="Product is successfully Added"
      }
      setTimeout(()=>(this.productMessage = undefined),3000)
    })
  }
}
