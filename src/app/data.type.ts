import { DatePipe } from '@angular/common';

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productDate: string;
  productQuantity: undefined | number;
  productId: undefined | number;
  // productAddDate:{day:string, month:string, date:number, year:number}
}

export interface cart {
  id: number | undefined;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productDate: string;
  productQuantity: undefined | number;
  userId: number;
  productId: number;
}

export interface pricesummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

