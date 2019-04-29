import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './main/product/product.component';
import { CompareComponent } from './main/product/compare/compare.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products/:type/:id', component: ProductComponent},
  {path: 'products/:type/:id1/compare/:id2', component: CompareComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userinfo', component: UserpageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
