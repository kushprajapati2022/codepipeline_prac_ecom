import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartRemoveTryComponent } from './cart-remove-try/cart-remove-try.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller',
    component: SellerAuthComponent,
  },
  {
    path: 'sellerhome',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'selleraddproduct',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sellerupdate/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'search/:query',
    component: SearchComponent  
  },
  {
    path:'product_detail/:product_id',
    component:ProductDetailsComponent
  },
  {
    path:'user_auth',
    component:UserAuthComponent
  },
  {
    path:'cart',
    component:CartPageComponent
  },
  {
    path:'testremove',
    component:CartRemoveTryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
