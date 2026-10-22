import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. Importar esto
import { ProductoCalzado } from '../../../core/models/inventario-ventas.model';


@Component({
  selector: 'app-stock-tallas',
  imports: [CommonModule], // <--- 2. Agregar esto aquí
  templateUrl: './stock-tallas.html',
  styleUrl: './stock-tallas.css',
})
export class StockTallas {
  @Input() producto!: ProductoCalzado;

  get totalPares(): number {
    if (!this.producto || !this.producto.existencias) return 0;
    return this.producto.existencias.reduce((acc, curr) => acc + curr.cantidad, 0);
  }

  estaAgotado(cantidad: number): boolean {
    return cantidad <= 0;
  }

  getBadgeClass(cantidad: number): string {
    if (cantidad === 0) return 'badge-danger';
    if (cantidad < 5) return 'badge-warning';
    return 'badge-success';
  }
}