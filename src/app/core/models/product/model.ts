import { ColorOpcion } from "../../../modules/offers/offers";

export interface Producto {
  nombre: string;
  precio: number;
  categoria:string;
  material: string;
  detalles: string;
  tallas: number[];
  colores: ColorOpcion[];
}
/* export interface Producto {
  nombre: string;
  precio: number;
  categoria: 'Militar' | 'Casual' | 'Vestir' | 'Zapatilla';
  material: string;
  tallas: string;
  imagen: string;
  descripcion?: string;
}*/