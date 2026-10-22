import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
 private items: any[] = [];
  // Este es el "canal" de noticias al que el Navbar se suscribirá
  private _cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this._cartCount.asObservable();

  agregarAlCarrito(producto: any) {
    this.items.push(producto);
    this._cartCount.next(this.items.length); // Avisamos que hay uno nuevo
    console.log('Producto en carrito:', this.items);
  }

  obtenerConteo() {
    return this.items.length;
  }

  obtenerArticulos() {
    return this.items;
  }
}
