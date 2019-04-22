import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './main/product/product.component';
import { CompareComponent } from './main/product/compare/compare.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products/:type/:id', component: ProductComponent},
  {path: 'products/:type/:id1/compare/:id2', component: CompareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
