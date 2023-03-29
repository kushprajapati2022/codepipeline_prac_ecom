import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productUpdateMessage: undefined | string;
  selectedProductData: undefined | Product;
  constructor(
    private route: ActivatedRoute,
    private productUpdate: SellerAddProductService,
    private reditrctRoute: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log('product update id', productId);
    productId &&
      this.productUpdate.getOneProduct(productId).subscribe((data) => {
        this.selectedProductData = data;
        console.log('data of product', data);
      });
  }
  updateProductdata(data: Product) {
    console.log('updated data', data);
    if(this.selectedProductData){
      data.id = this.selectedProductData.id
    }
    this.productUpdate.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productUpdateMessage = 'Product has updated';
      }
    });
    setTimeout(()=>{
      this.productUpdateMessage=undefined
      this.reditrctRoute.navigate(['/sellerhome'])
    },3000)
  }
}
