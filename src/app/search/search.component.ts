import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerAddProductService } from '../service/seller-add-product.service';
import { Product } from '../data.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResultdata:undefined|Product[]
  constructor(private activatedRoute:ActivatedRoute, private products:SellerAddProductService){}
  
  ngOnInit(): void {
    let query = this.activatedRoute.snapshot.paramMap.get('query')
    console.log("object",query);
    query && this.products.searchProduct(query).subscribe((result)=>{
      this.searchResultdata=result
      
    })
  }
}
