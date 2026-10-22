export interface InsumoMateriaPrima {
  id: string;
  nombre: string;
  unidadMedida: 'METROS' | 'UNIDADES' | 'KILOS';
  stockActual: number;
  stockMinimo: number;
}