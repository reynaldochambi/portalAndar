// login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  // Generamos números aleatorios para el captcha
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  resultadoCorrecto = this.num1 + this.num2;

  constructor(
    private fb: FormBuilder, 
    private router: Router) {

    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captcha: ['', [Validators.required]]
    });
  }

  onLogin() {
    const valorCaptcha = parseInt(this.loginForm.value.captcha);
    
    if (this.loginForm.valid && valorCaptcha === this.resultadoCorrecto) {
      console.log("Login exitoso", this.loginForm.value);
      this.router.navigate(['/catalog']); // Redirigir al catálogo
    } else {
      alert("Error: Datos incorrectos o captcha fallido");
      this.generarNuevoCaptcha();
    }
  }

  generarNuevoCaptcha() {
    this.num1 = Math.floor(Math.random() * 10);
    this.num2 = Math.floor(Math.random() * 10);
    this.resultadoCorrecto = this.num1 + this.num2;
    this.loginForm.get('captcha')?.reset();
  }
}