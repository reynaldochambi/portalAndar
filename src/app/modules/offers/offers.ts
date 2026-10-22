import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColorOpcion {
  nombre: string;
  imagen: string;
}

export interface ProductoOferta {
  id: number;
  nombre: string;
  categoria: string;
  material: string;
  detalles: string;
  precio: number;
  precioAnterior: number;
  tallas: number[];
  colores: ColorOpcion[];
  campana?: string;
}

@Component({
  selector: 'app-offers',
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrl: './offers.css',
})
export class Offers implements OnInit, OnDestroy {  

  // Número de WhatsApp receptor (Ejemplo para Bolivia +591)
  readonly NUMERO_WHATSAPP = '59177573434'; 

  campanaActiva: string = 'padre';
  bannerActual: { titulo: string; imagen: string } | null = null;

  banners: { [key: string]: { titulo: string; imagen: string } } = {
    padre: { titulo: 'Día del Padre', imagen: 'assets/ofertas/dia-padre.jpg' },
    navidad: { titulo: 'Especial Navidad', imagen: 'assets/ofertas/dia-navidad.jpg' },
    estudiante: { titulo: 'Día del Estudiante', imagen: 'assets/ofertas/dia-estudiante.jpg' }
  };

  ofertas: ProductoOferta[] = [
    {
      id: 1,
      nombre: 'Bota Altama Tactica',
      categoria: 'Botas',
      material: '100% Cuero Vacuno',
      detalles: 'Forro térmico acolchado y suela antideslizante',
      precio: 280,
      precioAnterior: 350,
      tallas: [38, 39, 40, 41, 42],
      colores: [
        { nombre: 'Beis', imagen: 'assets/ofertas/bota-altama-beis.png' },
        { nombre: 'Negro', imagen: 'assets/ofertas/bota-altama-negro.png' }
      ],
      campana: 'padre'
    },
    {
      id: 2,
      nombre: 'Botín Caña Alta Ultra',
      categoria: 'Botines',
      material: 'Cuero Genuino',
      detalles: 'Costuras reforzadas y plantilla confort',
      precio: 250,
      precioAnterior: 320,
      tallas: [37, 38, 39, 40, 41],
      colores: [
        { nombre: 'Café Oscuro', imagen: 'assets/ofertas/botin-caña-alta cafe-oscuro.png' },
        { nombre: 'Café Claro', imagen: 'assets/ofertas/botin-caña-alta-cafe-claro.png' },
        { nombre: 'Negro', imagen: 'assets/ofertas/botin-caña-alta-negro.png' }
      ],
      campana: 'padre'
    },
    {
      id: 3,
      nombre: 'Mocasín Clásico Elite',
      categoria: 'Mocasines',
      material: 'Cuero Flex',
      detalles: 'Diseño elegante y suela ligera de alta durabilidad',
      precio: 210,
      precioAnterior: 270,
      tallas: [38, 39, 40, 41, 42],
      colores: [
        { nombre: 'Café', imagen: 'assets/ofertas/mocasin-clasico-cafe.png' },
        { nombre: 'Guindo', imagen: 'assets/ofertas/mocasin-clasico-guindo.png' },
        { nombre: 'Negro', imagen: 'assets/ofertas/mocasin-clasico-negro.png' }
      ],
      campana: 'estudiante'
    }
  ];

  // Variables de Estado del Modal
  zapatoSeleccionado: ProductoOferta | null = null;
  tallaSeleccionada: number | null = null;
  colorSeleccionado: ColorOpcion | null = null;
  imagenVistaPrevia: string = '';
  cantidad: number = 1;

  // Variables para la cuenta regresiva
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';
  
  private timerInterval: any;

  ngOnInit(): void {
    this.filtrarCampana('padre');
    this.iniciarCuentaRegresiva();
  }

  ngOnDestroy(): void {
    // Es vital limpiar el intervalo al destruir el componente para evitar fugas de memoria
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  filtrarCampana(campana: string): void {
    this.campanaActiva = campana;
    this.bannerActual = this.banners[campana] || null;
  }

  calcularPorcentaje(precioActual: number, precioAnterior: number): number {
    if (!precioAnterior || precioAnterior <= precioActual) return 0;
    return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
  }

  abrirDetalle(producto: ProductoOferta): void {
    this.zapatoSeleccionado = producto;
    this.tallaSeleccionada = null;
    this.colorSeleccionado = producto.colores[0] || null;
    this.imagenVistaPrevia = this.colorSeleccionado ? this.colorSeleccionado.imagen : '';
    this.cantidad = 1;
  }

  cerrarDetalle(): void {
    this.zapatoSeleccionado = null;
    this.tallaSeleccionada = null;
    this.colorSeleccionado = null;
    this.cantidad = 1;
  }

  setTalla(talla: number): void {
    this.tallaSeleccionada = talla;
  }

  setColor(color: ColorOpcion): void {
    this.colorSeleccionado = color;
    this.imagenVistaPrevia = color.imagen;
  }

  modificarCantidad(delta: number): void {
    const nuevaCantidad = this.cantidad + delta;
    if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
      this.cantidad = nuevaCantidad;
    }
  }

  enviarAWhatsApp(): void {
    if (!this.zapatoSeleccionado || !this.tallaSeleccionada || !this.colorSeleccionado) {
      return;
    }

    const total = this.zapatoSeleccionado.precio * this.cantidad;

    const mensaje = 
      `¡Hola! 👋 Deseo realizar un pedido de la sección de *Ofertas*:\n\n` +
      `👞 *Producto:* ${this.zapatoSeleccionado.nombre}\n` +
      `🎨 *Color:* ${this.colorSeleccionado.nombre}\n` +
      `📏 *Talla (Número):* ${this.tallaSeleccionada}\n` +
      `🔢 *Cantidad:* ${this.cantidad} par(es)\n` +
      `💰 *Precio Unitario:* Bs ${this.zapatoSeleccionado.precio}\n` +
      `💵 *Total a Pagar:* Bs ${total}\n\n` +
      `¿Me indican los datos para realizar la transferencia o pago QR? Muchas gracias.`;

    const url = `https://wa.me/${this.NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  iniciarCuentaRegresiva(): void {
    // Definimos una fecha limite (ejemplo: fin de la oferta hoy a las 23:59:59)
    const fechaFin = new Date();
    fechaFin.setHours(23, 59, 59, 999);

    this.timerInterval = setInterval(() => {
      const ahora = new Date().getTime();
      const distancia = fechaFin.getTime() - ahora;

      if (distancia < 0) {
        clearInterval(this.timerInterval);
        this.horas = '00';
        this.minutos = '00';
        this.segundos = '00';
        return;
      }

      // Cálculos de horas, minutos y segundos restantes
      const hrs = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segs = Math.floor((distancia % (1000 * 60)) / 1000);

      // Formato con cero a la izquierda (ej. '09' en lugar de '9')
      this.horas = hrs < 10 ? `0${hrs}` : `${hrs}`;
      this.minutos = mins < 10 ? `0${mins}` : `${mins}`;
      this.segundos = segs < 10 ? `0${segs}` : `${segs}`;
    }, 1000);
  }
}


/*
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductoOferta {
id: number;
  nombre: string;
  categoria: string;
  material: string;
  detalles: string;
  precioAnterior: number;
  precio: number;
  imagenes: string[];
  tallas: number[];
}

interface Campana {
  id: string;
  nombre: string;
  imagen: string; // En lugar de imagenBanner
  titulo: string; // En lugar de descuentoTexto
}

@Component({
  selector: 'app-offers',
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrl: './offers.css',
})
export class Offers implements OnInit {
  @Output() agregarAlCarrito = new EventEmitter<{ producto: ProductoOferta; talla: number }>();

  ofertas: ProductoOferta[] = [];
  zapatoSeleccionado: ProductoOferta | null = null;
  tallaSeleccionada: number | null = null;

  ngOnInit(): void {
    // Inicializar con la campaña activa por defecto
    this.filtrarCampana(this.campanaActiva);
    this.ofertas = [
      {
        id: 101,
        nombre: 'Botín Caña Alta de Cuero Gummy',
        categoria: 'Militar / Botas',
        material: 'Res Gummy Antideslizante',
        detalles: 'Forro térmico antibacterial y suela de alta tracción',
        precioAnterior: 380,
        precio: 310,
        imagenes: ['assets/ofertas/botin-caña-alta-negro.png'],
        tallas: [38, 39, 40, 41, 42]
      },
      {
        id: 102,
        nombre: 'Mocasín Clásico Formal',
        categoria: 'Casual / Vestir',
        material: 'Cuero Flother Suave',
        detalles: 'Plantilla confort antihongos con acabado a mano',
        precioAnterior: 320,
        precio: 250,
        imagenes: ['assets/ofertas/mocasin-clasico-guindo.png'],
        tallas: [37, 38, 39, 40]
      },
      {
        id: 103,
        nombre: 'Bota Táctica Altama',
        categoria: 'Militar',
        material: 'Cuero Reforzado 100%',
        detalles: 'Doble costura de alta resistencia y pasadores metálicos',
        precioAnterior: 450,
        precio: 380,
        imagenes: ['assets/ofertas/bota-altama-beis.png'],
        tallas: [39, 40, 41, 42, 43]
      }
    ];
  }

  calcularPorcentaje(precioOferta: number, precioOriginal: number): number {
    return Math.round(((precioOriginal - precioOferta) / precioOriginal) * 100);
  }

  abrirDetalle(producto: ProductoOferta): void {
    this.zapatoSeleccionado = producto;
    this.tallaSeleccionada = null; // Reiniciar talla al abrir modal
  }

  cerrarDetalle(): void {
    this.zapatoSeleccionado = null;
    this.tallaSeleccionada = null;
  }

  setTalla(talla: number): void {
    this.tallaSeleccionada = talla;
  }

  confirmarCompra(): void {
    if (this.zapatoSeleccionado && this.tallaSeleccionada) {
      // Emitir el objeto completo al listener del carrito
      this.agregarAlCarrito.emit({
        producto: this.zapatoSeleccionado,
        talla: this.tallaSeleccionada
      });
      this.cerrarDetalle();
    }
  }

  // segunda parte
  campanaSeleccionada: string = 'estudiante'; // Campaña por defecto

// 2. Actualizar el objeto campanas en tu componente TS
campanas: Record<string, Campana> = {
  estudiante: {
    id: 'estudiante',
    nombre: 'Día del Estudiante',
    imagen: 'assets/ofertas/dia-estudiante.jpg',
    titulo: '2 Pares de Botines Sport por 300 Bs'
  },
  navidad: {
    id: 'navidad',
    nombre: 'Descuentos Navideños',
    imagen: 'assets/ofertas/dia-navidad.jpg',
    titulo: 'Modelos Sport en Cuero Camelido por 230 Bs'
  },
  padre: {
    id: 'padre',
    nombre: 'Día del Padre',
    imagen: 'assets/ofertas/dia-padre.jpg',
    titulo: 'Zapatenis de Cuero Legítimo con Tecnología Antideslizante'
  }
};

  cambiarCampana(idCampana: string): void {
    this.campanaSeleccionada = idCampana;
  }

  // 1. Declaración de propiedades requeridas por el HTML
  campanaActiva: string = 'estudiante';
  bannerActual: Campana | null = null;

   // 2. Método requerido por el evento (click) del HTML
  filtrarCampana(idCampana: string): void {
    this.campanaActiva = idCampana;
    this.bannerActual = this.campanas[idCampana] || null;
  }
}
  */