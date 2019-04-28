import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { LoginComponent } from './login/login.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminProductDetailComponent } from './admin/admin-product-detail/admin-product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { httpInterceptorProviders } from './auth-interceptor';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminCategoryDetailComponent } from './admin/admin-category-detail/admin-category-detail.component';
import { AdminCategoryListComponent } from './admin/admin-category-list/admin-category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginLayoutComponent,
    DefaultLayoutComponent,
    LoginComponent,
    AdminProductListComponent,
    AdminProductDetailComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductDetailComponent,
    RegisterComponent,
    ShoppingCartComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminCategoryDetailComponent,
    AdminCategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    // DataTableModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }