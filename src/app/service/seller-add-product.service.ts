import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { json } from 'stream/consumers';
import { cart, Product } from '../data.type';

@Injectable({
  providedIn: 'root',
})
export class SellerAddProductService {
  cartNumberData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient) {}

  addProduct(data: Product) {
    console.log('add product success', data);
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteOneProduce(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getOneProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: Product) {
    console.log('object', product.id);
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  popularProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`);
  }

  trandyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`);
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localcart = localStorage.getItem('localcart');
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartNumberData.emit([data])
    } else {
      cartData = JSON.parse(localcart);
      cartData.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartData));
      this.cartNumberData.emit(cartData);
    }
  }

  localRemoveToCart(productId: any) {
    let cartData = localStorage.getItem('localcart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      console.log('<<<removed new list>>>', items);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartNumberData.emit(items);
    }
  }

  // mRm(id:any){
  //   let cartData44 = localStorage.getItem('cart');
  //   if (cartData44) {
  //     let items: Product[] = JSON.parse(cartData44);
  //     items = items.filter((item: Product) => id !== item.id);
  //     console.log('<<<removed new list>>>', items);
  //     localStorage.setItem('cart', JSON.stringify(items));
  //     // this.cartNumberData.emit(items);
  //   }
  // }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getartList(userId: number) {
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {
      observe: 'response',
    }).subscribe((result)=>{
      if(result && result.body){

        this.cartNumberData.emit(result.body)
      }

    });
  }

  removeToCartFromDB(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`, );
  }

  cartDetailsList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
  }
}
