import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart } from '../../../core/services/cart';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  cantidadCarrito: number = 0;
  isMenuOpen: boolean = false; // Controla la visibilidad en móviles

  constructor(private cartService: Cart) {}

  ngOnInit() {
    // Escucha directa al servicio del carrito intacta
    this.cartService.cartCount$.subscribe(count => {
      this.cantidadCarrito = count;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}