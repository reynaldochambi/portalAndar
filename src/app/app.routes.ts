//import { Routes } from '@angular/router';
import { Login } from './modules/auth/pages/login/login';
import { ProductList } from './modules/catalog/pages/product-list/product-list';
import { CartSumary } from './modules/cart/pages/cart-sumary/cart-sumary';

/*export const routes: Routes = [
//    { path: 'auth/login', component: Login },
  { path: 'catalog', component: ProductList },
  { path: 'cart', component: CartSumary },
  { path: '', redirectTo: 'catalog', pathMatch: 'full' }
];
*/
import { Routes } from '@angular/router';
import { Taller } from './modules/taller/taller';
import { Contacto } from './modules/contacto/contacto';
import { Home } from './modules/home/home';
import { Offers } from './modules/offers/offers';

export const routes: Routes = [
  { path: '', component: Home }, // Página principal
  { path: 'taller', component: Taller }, // Reseña histórica 1986
  { path: 'catalog', component: ProductList }, // Catálogo ya desarrollado
  { path: 'ofertas', component: Offers }, // Calzados en oferta
  { path: 'contacto', component: Contacto }, // Dirección La Paz y Redes
  { path: 'cart', component: CartSumary },
  { path: 'auth/login', component: Login },
  { path: '**', redirectTo: '' }
];