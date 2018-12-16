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
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
//import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginLayoutComponent,
    DefaultLayoutComponent,
    LoginComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
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
    AuthService,
    UserService,
    ProductService,
    //AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }