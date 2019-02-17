import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:id', component: ProductDetailComponent },
    ]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/:id', component: ProductFormComponent },
      { path: 'products', component: AdminProductsComponent },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
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
