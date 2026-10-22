import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  productoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      codigoArticulo: ['', Validators.required],
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      precioVenta: [0, [Validators.required, Validators.min(1)]],
      // FormArray para manejar múltiples tallas
      existencias: this.fb.array([])
    });
  }

  ngOnInit() {
    // Agregamos una talla por defecto al iniciar
    this.agregarTalla();
  }

  get existencias() {
    return this.productoForm.get('existencias') as FormArray;
  }

  agregarTalla() {
    const tallaForm = this.fb.group({
      talla: [35, [Validators.required, Validators.min(20), Validators.max(50)]],
      cantidad: [0, [Validators.required, Validators.min(0)]]
    });
    this.existencias.push(tallaForm);
  }

  removerTalla(index: number) {
    this.existencias.removeAt(index);
  }

  guardar() {
    if (this.productoForm.valid) {
      console.log('Datos a enviar a Quarkus:', this.productoForm.value);
      alert('Producto simulado guardado con éxito');
    }
  }
}