import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private getproducts: SellerAddProductService
  ) {}

  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  removeCartDataDb: Product | undefined;

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('product_id');
    console.log('p idddd:====', productId);
    productId &&
      this.getproducts.getOneProduct(productId).subscribe((result) => {
        console.log('pro dettailll', result);
        this.productData = result;
        let cartData = localStorage.getItem('localcart');
        if (productId && cartData) {
          let checkItems = JSON.parse(cartData);
          checkItems = checkItems.filter(
            (item: Product) => productId == item.id.toString()
          );
          if (checkItems.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.getproducts.getartList(userId);
          this.getproducts.cartNumberData.subscribe((result) => {
            let items = result.filter(
              (item: Product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (items.length) {
              this.removeCartDataDb = items[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.productQuantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.log('cart outside login data', this.productData);
        this.getproducts.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.log('<<user id logedin>>');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartLogedIndata: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartLogedIndata.id;
        console.log('<<updated adata>>', cartLogedIndata);
        this.getproducts.addToCart(cartLogedIndata).subscribe((result) => {
          console.log('<<cart result>>', result);
          if (result) {
            this.getproducts.getartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: any) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (!localStorage.getItem('user')) {
      console.log('iddddd', productId);
      this.getproducts.localRemoveToCart(productId);
    } else {
      console.log("<<card removedddddd id>>",this.removeCartDataDb);
      this.removeCartDataDb && this.getproducts.removeToCartFromDB(this.removeCartDataDb?.id).subscribe((dataremove)=>{
        if(dataremove){
          this.getproducts.getartList(userId)
        }
      })
      this.removeCart = false;
    }
  }
}
