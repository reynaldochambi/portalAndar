import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../core/models/product/model';
import { Cart } from '../../../../core/services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true, // Asegúrate de tener esto si usas imports directos
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  // Declaración de propiedades faltantes
  zapatoSeleccionado: any = null;
  imagenVistaPrevia: string = '';
  colorSeleccionado: any = null;
  tallaSeleccionada: any = null;
  cantidad: number = 1;
  // Variable para controlar qué botón se resalta
  categoriaActiva: string = 'Todos';
  // 1. Definición de la lista de productos
productos: Producto[] = [
  { 
    nombre: 'Oxford Clásico', 
    precio: 330, 
    categoria: 'Vestir', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    tallas: [38, 39, 40, 41, 42],
    colores: [
      { nombre: 'Guindo', imagen: 'assets/catalogo/oxford-clasico-guindo.png' },
      { nombre: 'Negro', imagen: 'assets/catalogo/oxford-clasico-negro.png' }
      
        
    ]
  },
 /* { 
    nombre: 'Oxford Clásico', 
    precio: 350, 
    categoria: 'Vestir', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    tallas: '38 al 43', 
    imagenes: ['assets/catalogo/oxford-2.png'] 
  },*/
  { 
    nombre: 'Oxford Clásico 2', 
    precio: 330, 
    categoria: 'Vestir', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    tallas: [38, 39, 40, 41, 42],
    colores: [
        { nombre: 'Negro', imagen: 'assets/catalogo/oxford-2-negro.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/oxford-2-guindo.png' }
    ]
  },
  { 
    nombre: 'Oxford Elegante', 
    precio: 330, 
    categoria: 'Vestir', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    tallas: [38, 39, 40, 41, 42, 43],
    colores: [
      { nombre: 'Negro', imagen: 'assets/catalogo/oxford-elegante-negro.png' },  
      { nombre: 'Guindo', imagen: 'assets/catalogo/oxford-elegante-guindo.png' }
        
    ]
  },
  { 
    nombre: 'Oxford Media Luna', 
    precio: 330, 
    categoria: 'Vestir', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Forro y plantilla Cuero camélido y antitranspirante',
    tallas: [38, 39, 40, 41, 42],
    colores: [
        { nombre: 'Negro', imagen: 'assets/catalogo/oxford-medialuna-negro.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/oxford-medialuna-guindo.png' }
    ]
  },
  { 
    nombre: 'Bota Altama', 
    precio: 350, 
    categoria: 'Militar', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Suela de alta resistencia, forro camélido',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Negro', imagen: 'assets/catalogo/bota-altama-negro.png' },
        { nombre: 'Beis', imagen: 'assets/catalogo/bota-altama-beis.png' }
    ]
  },
  { 
    nombre: 'Botín Chelsea', 
    precio: 380, 
    categoria: 'Casual', 
    material: 'Cuero viejo graso de primera calidad', 
    detalles: 'Elásticos laterales, forro camélido',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Negro', imagen: 'assets/catalogo/botin-chelsea-negro.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/botin-chelsea-guindo.png' }
    ]
  },
  { 
    nombre: 'Mocasín Clásico', 
    precio: 330, 
    categoria: 'Casual', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Sin cordones, forro camélido antitranspirante',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Café', imagen: 'assets/catalogo/mocasin-clasico-cafe.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/mocasin-clasico-guindo.png' },
        { nombre: 'Negro', imagen: 'assets/catalogo/mocasin-clasico-negro.png' }
    ]
  },
  { 
    nombre: 'Mocasín Sport', 
    precio: 330, 
    categoria: 'Casual', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Suela flexible, forro camélido',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Cafe', imagen: 'assets/catalogo/mocasin-sport-cafe.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/mocasin-sport-guindo.png' },
        { nombre: 'Negro', imagen: 'assets/catalogo/mocasin-sport-negro.png' }
    ]
  },
  { 
    nombre: 'Botín Caña Alta', 
    precio: 380, 
    categoria: 'Militar', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Protección de tobillo, forro camélido',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Café Oscuro', imagen: 'assets/catalogo/botin-caña-alta cafe-oscuro.png' },
        { nombre: 'Café Claro', imagen: 'assets/catalogo/botin-caña-alta-cafe-claro.png' },
        { nombre: 'Negro', imagen: 'assets/catalogo/botin-caña-alta-negro.png' }
    ]
  },
  { 
    nombre: 'Zapatenis', 
    precio: 350, 
    categoria: 'Casual', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Estilo zapatilla urbana, forro camélido',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Azul', imagen: 'assets/catalogo/zapatenis-azul.png' },
        { nombre: 'Café', imagen: 'assets/catalogo/zapatenis-cafe.png' },
        { nombre: 'Negro', imagen: 'assets/catalogo/zapatenis-negro.png' }
    ]
  },
  { 
    nombre: 'Botín Caña baja', 
    precio: 350, 
    categoria: 'Casual', 
    material: 'Cuero natural de primera calidad', 
    detalles: 'Protección de tobillo, forro camélido antitranspirante',
    tallas: [37, 38, 39, 40, 41],
    colores: [
        { nombre: 'Café', imagen: 'assets/catalogo/botin-caña-baja-cafe.png' },
        { nombre: 'Guindo', imagen: 'assets/catalogo/botin-caña-baja-guindo.png' },
        { nombre: 'Negro', imagen: 'assets/catalogo/botin-caña-baja-negro.png' }
    ]
  }
];
  // 2. Variables de control para el Popup y filtrado
  
  productosFiltrados: Producto[] = [];

  // 3. Funciones del componente
  ngOnInit() {
    //this.productosFiltrados = this.productos; // Mostrar todos al inicio
    this.filtrar('Todos'); // Inicializa mostrando todos y activando el botón "Todos"
  }

  //abrirDetalle(producto: any) {
  //  this.zapatoSeleccionado = producto;
  //}

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;

    if (categoria === 'Todos') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria === categoria);
    }
  }

// En product-list.ts
constructor(private cartService: Cart) {} // Inyectar el servicio

confirmarCompra() {
  const productoConOpciones = {
    ...this.zapatoSeleccionado,
    colorSeleccionado: this.colorSeleccionado,
    tallaSeleccionada: this.tallaSeleccionada,
    cantidad: this.cantidad
  };

  // Supongamos que tienes un servicio de carrito (ej. cartService.agregar(productoConOpciones))
  // O si lo manejas localmente / mediante un servicio compartido:
  this.cartService.agregarAlCarrito(productoConOpciones);

  // Cierra el modal y opcionalmente redirige o avisa al usuario
  this.cerrarDetalle();
}

abrirDetalle(producto: any) {
    // Clonamos el producto para no mutar el original directamente
    this.zapatoSeleccionado = { ...producto };

    // 1. MANEJO INTELIGENTE DE TALLAS:
    // Si el producto trae un string como '38 al 42', lo convertimos en un array de números [38, 39, 40, 41, 42]
    // O si ya trae un array, lo respetamos tal cual.
    if (typeof this.zapatoSeleccionado.tallas === 'string') {
      if (this.zapatoSeleccionado.tallas.includes('38 al 42')) {
        this.zapatoSeleccionado.tallas = [38, 39, 40, 41, 42];
      } else if (this.zapatoSeleccionado.tallas.includes('37 al 42')) {
        this.zapatoSeleccionado.tallas = [37, 38, 39, 40, 41, 42];
      } else {
        this.zapatoSeleccionado.tallas = [38, 39, 40, 41, 42]; // Fallback por defecto
      }
    } else if (!Array.isArray(this.zapatoSeleccionado.tallas)) {
      this.zapatoSeleccionado.tallas = [38, 39, 40, 41, 42];
    }

    // 2. MANEJO INTELIGENTE DE COLORES E IMÁGENES:
    // Si el producto ya trae su arreglo de colores (como en offers), lo usamos.
    // Si no, construimos los colores basándonos en las imágenes que tenga el producto o el nombre del modelo.
    if (!this.zapatoSeleccionado.colores || this.zapatoSeleccionado.colores.length === 0) {
      if (Array.isArray(this.zapatoSeleccionado.imagenes) && this.zapatoSeleccionado.imagenes.length > 0) {
        // Si tiene varias imágenes en un array
        this.zapatoSeleccionado.colores = this.zapatoSeleccionado.imagenes.map((img: string, idx: number) => ({
          nombre: idx === 0 ? 'Principal' : `Opción ${idx + 1}`,
          imagen: img
        }));
      } else if (this.zapatoSeleccionado.imagen) {
        // Si tiene una sola imagen principal
        this.zapatoSeleccionado.colores = [
          { nombre: 'Estándar', imagen: this.zapatoSeleccionado.imagen }
        ];
      } else {
        // Fallback de seguridad usando la primera imagen de assets si no viene ninguna
        this.zapatoSeleccionado.colores = [
          { nombre: 'Único', imagen: 'assets/catalogo/mocasin-clasico.png' }
        ];
      }
    }

    // 3. Inicializar valores por defecto al abrir el popup
    this.colorSeleccionado = this.zapatoSeleccionado.colores[0];
    this.imagenVistaPrevia = this.colorSeleccionado ? this.colorSeleccionado.imagen : '';
    this.tallaSeleccionada = null;
    this.cantidad = 1;
  }

setColor(color: any) {
  this.colorSeleccionado = color;
  this.imagenVistaPrevia = color.imagen;
}

setTalla(talla: any) {
  this.tallaSeleccionada = talla;
}

modificarCantidad(cambio: number) {
  this.cantidad += cambio;
  if (this.cantidad < 1) {
    this.cantidad = 1;
  }
}

cerrarDetalle() {
  this.zapatoSeleccionado = null;
}
  
}