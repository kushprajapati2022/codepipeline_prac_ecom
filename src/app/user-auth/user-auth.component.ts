import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, Login, Product, SignUp } from '../data.type';
import { SellerAddProductComponent } from '../seller-add-product/seller-add-product.component';
import { SellerAddProductService } from '../service/seller-add-product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  errorMsg: string = '';
  constructor(
    private user: UserService,
    private router: Router,
    private getproductdetail: SellerAddProductService
  ) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(value: SignUp) {
    console.log('signup data0', value);
    this.user.userSignup(value);
  }

  signupUser(data: Login) {
    console.log('login data', data);
    this.user.userLogin(data);
    this.user.userAuthError.subscribe((result) => {
      console.log('error worn', result);
      if (result) {
        this.errorMsg = 'please enter valid user details';
      }else{
        this.localCartToDBCart()
      }
    });
  }

  openLogin() {
    this.showLogin = false;
  }

  openSignUp() {
    this.showLogin = true;
  }

  localCartToDBCart() {
    let data = localStorage.getItem('localcart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cardDataList: Product[] = JSON.parse(data);
      

      cardDataList.forEach((product: Product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.getproductdetail.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('<<ITEM STORED IN DB>>');
            }
          });
        }, 2000);
        if (cardDataList.length === index + 1) {
          localStorage.removeItem('localcart');
        }
      });
    }
    setTimeout(() => {
      
      this.getproductdetail.getartList(userId)
    }, 1000);
  }

  
}
