import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSelectModule,
  MatListModule,
  MatDividerModule,
  MatMenuModule,
  MatSliderModule,
  MatIconModule, MatTabsModule, MatGridListModule, MatRadioModule, MatDatepickerModule, MatTooltipModule
} from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './main/product/product.component';
import { CompareComponent } from './main/product/compare/compare.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CartComponent } from './cart/cart.component';
import { CommentComponent } from './main/product/comment/comment.component';
import { CommentCreateComponent } from './main/product/comment-create/comment-create.component';
import { UserpageComponent } from './userpage/userpage.component';
import { RateComponent } from './main/product/rate/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListUsersComponent,
    MainComponent,
    ProductComponent,
    CompareComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    CommentCreateComponent,
    CommentComponent,
    UserpageComponent,
    RateComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    HttpClientModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSliderModule,
    MatTooltipModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
