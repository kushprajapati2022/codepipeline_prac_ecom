import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resourceLimits } from 'worker_threads';
import { Product } from '../data.type';
import { SellerAddProductService } from '../service/seller-add-product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: string = '';
  searchedResult: undefined | Product[];
  userName: string = '';
  cartNumber = 0;

  constructor(
    private route: Router,
    private product: SellerAddProductService
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((data: any) => {
      if (data.url) {
        console.log('header data', data.url);
        if (localStorage.getItem('seller') && data.url.includes('seller')) {
          console.log('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerNameStore = localStorage.getItem('seller');
            let sellerData = sellerNameStore && JSON.parse(sellerNameStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userNameStore = localStorage.getItem('user');
          let userData = userNameStore && JSON.parse(userNameStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getartList(userData.id)
        } else {
          console.log('outside seller');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localcart');
    if (cartData) {
      this.cartNumber = JSON.parse(cartData).length;
    }
    this.product.cartNumberData.subscribe((items) => {
      this.cartNumber = items.length;
    });
  }

  searchProducthere(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((item) => {
        console.log('serched', item);
        this.searchedResult = item;
        if (item.length > 5) {
          item.length = 5;
        }
      });
      console.log('search vala result', element.value);
    }
  }
  hideSearch() {
    this.searchedResult = undefined;
  }

  submitSearchResult(value: string) {
    console.log('f', value);
    this.route.navigate([`/search/${value}`]);
  }
  redirectDetail(id: number) {
    this.route.navigate([`/product_detail/${id}`]);
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user_auth']);
    this.product.cartNumberData.emit([])
  }
}
