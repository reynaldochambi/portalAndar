export interface StockPorTalla {
  talla: number;      // Ej: 35, 36, 37...
  cantidad: number;   // Cuántos pares hay de esa talla
}

export interface ProductoCalzado {
  id: string;               // UUID o ID de base de datos
  codigoArticulo: string;   // Ej: "ZAP-001"
  nombre: string;           // Ej: "Botín Cuero Premium"
  color: string;            // Ej: "Marrón Café"
  categoria: string;        // Ej: "Dama", "Varón", "Seguridad"
  precioVenta: number;      // Precio en BOB
  
  // La matriz de tallas
  existencias: StockPorTalla[]; 
  
  imagenUrl?: string;
  fechaUltimoIngreso?: Date;
}