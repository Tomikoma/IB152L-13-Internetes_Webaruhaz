import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './main/product/product.component';
import { CompareComponent } from './main/product/compare/compare.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserpageComponent } from './userpage/userpage.component';
import {CartComponent} from './cart/cart.component';
import {AdminpageComponent} from './adminpage/adminpage.component';
import { OrderComponent } from './order/order.component';
import {UploadmoneyComponent} from './uploadmoney/uploadmoney.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products/:type/:id', component: ProductComponent},
  {path: 'products/:type/:id1/compare/:id2', component: CompareComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userinfo', component: UserpageComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'adminpage', component: AdminpageComponent,  canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'uploadmoney', component: UploadmoneyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
