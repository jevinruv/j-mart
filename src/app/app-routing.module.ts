import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminProductDetailComponent } from './admin/admin-product-detail/admin-product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'products/new', component: AdminProductDetailComponent },
      { path: 'products/:id', component: AdminProductDetailComponent },
      { path: 'products', component: AdminProductListComponent },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'admin/login', component: AdminLoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
