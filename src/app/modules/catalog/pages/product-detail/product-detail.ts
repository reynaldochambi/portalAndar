import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  // Datos reales del modelo Oxford Media Luna del catálogo [cite: 32, 33, 34, 38]
  producto: any = {
    nombre: 'Oxford Media Luna',
    precio: 330,
    material: 'Cuero natural de primera calidad',
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    descripcion: 'Un diseño atemporal, ideal para el uso formal',
    tallas: [37, 38, 39, 40, 41, 42],
    imagenes: [
      'assets/oxford-1.png',
      'assets/oxford-2.png',
      'assets/oxford-3.png'
    ]
  };

  imagenPrincipal: string = '';
  tallaSeleccionada: number | null = null;

  ngOnInit() {
    this.imagenPrincipal = this.producto.imagenes[0];
  }

  setImagen(img: string) {
    this.imagenPrincipal = img;
  }

  setTalla(t: number) {
    this.tallaSeleccionada = t;
  }
}