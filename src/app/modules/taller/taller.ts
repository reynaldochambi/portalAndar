import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface FotoTrayectoria {
  url: string;
  descripcion: string;
}

@Component({
  selector: 'app-taller',
  imports: [CommonModule],
  templateUrl: './taller.html',
  styleUrl: './taller.css',
})
export class Taller implements OnInit {

  // Arreglo con la lista de imágenes para la galería
  fotosTrayectoria: FotoTrayectoria[] = [];

  ngOnInit(): void {
    this.fotosTrayectoria = [
      { url: 'assets/taller/taller1.jpg', descripcion: 'Elaboración artesanal en cuero' },
      { url: 'assets/taller/taller2.jpg', descripcion: 'Participación en ferias nacionales' },
      { url: 'assets/taller/taller3.jpg', descripcion: 'Elaboración artesanal en cuero' },
      { url: 'assets/taller/taller4.jpg', descripcion: 'Participación en ferias nacionales' },
      //{ url: 'assets/taller/taller5.jpg', descripcion: 'Elaboración artesanal en cuero' },
      { url: 'assets/taller/taller6.jpg', descripcion: 'Participación en ferias nacionales' },
      { url: 'assets/taller/taller7.jpg', descripcion: 'Elaboración artesanal en cuero' },
      { url: 'assets/taller/taller8.jpg', descripcion: 'Participación en ferias nacionales' },
      { url: 'assets/taller/taller9.jpg', descripcion: 'Participación en ferias nacionales' },
      { url: 'assets/taller/taller10.jpg', descripcion: 'Detalles y acabados a mano' }
    ];
  }
}