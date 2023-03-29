import { Component, OnInit } from '@angular/core';
import { Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productMessage:undefined|string
  productFullList: undefined | Product[];
  constructor(private product: SellerAddProductService) {}

  ngOnInit(): void {
    this.productList()
  }

  productList(){
    this.product.productList().subscribe((result) => {
      console.log('get product', result);
      this.productFullList=result
    });
  }

  deleteProduct(id:number){
    console.log("delete id", id);
    this.product.deleteOneProduce(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is Deleted"
        this.productList()
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)
  }
}
