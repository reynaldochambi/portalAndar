import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../../core/services/cart';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";


@Component({
  selector: 'app-cart-sumary',
  imports: [CommonModule, AuthRoutingModule],
  templateUrl: './cart-sumary.html',
  styleUrl: './cart-sumary.css',
})
export class CartSumary implements OnInit {
  articulos: any[] = [];
  total: number = 0;

  constructor(private cartService: Cart) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.articulos = this.cartService.obtenerArticulos();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.articulos.reduce((acc, item) => {
    const cantidad = item.cantidad ? Number(item.cantidad) : 1;
    return acc + (Number(item.precio) * cantidad);
  }, 0);
  }

  eliminar(index: number) {
    // Implementaremos una función en el servicio para esto luego
    this.articulos.splice(index, 1);
    this.calcularTotal();
    // Actualizar el contador del navbar también (opcional por ahora)
  }

finalizarPedido() {
  const telefono = "59177573434"; // Número de WhatsApp de Andar Bolivia
  let mensaje = "Hola, deseo confirmar el siguiente pedido de Andar Bolivia:%0A%0A";

  // Corrección: usar .forEach correctamente sobre el arreglo 'articulos'
  this.articulos.forEach((item: any, index: number) => {
    mensaje += `${index + 1}. *${item.nombre}*%0A`;
    mensaje += `   - Color: ${item.colorSeleccionado?.nombre || 'N/A'}%0A`;
    mensaje += `   - Talla: ${item.tallaSeleccionada || 'N/A'}%0A`;
    mensaje += `   - Cantidad: ${item.cantidad}%0A`;
    mensaje += `   - Subtotal: Bs ${item.precio * item.cantidad}%0A%0A`;
  });

  mensaje += `*TOTAL GENERAL: Bs ${this.total}*`;

  window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}
}