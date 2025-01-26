import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false; // Estado de carga

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignUp() {
    this.errorMessage = '';
    this.isLoading = true; // Activar estado de carga

    // Validaciones básicas
    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      this.isLoading = false; // Desactivar estado de carga
      return;
    }

    if (this.password.length < 8 || this.password.length > 32) {
      this.errorMessage = 'Password must be between 8 and 32 characters.';
      this.isLoading = false; // Desactivar estado de carga
      return;
    }

    // Verificar si el correo ya existe
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === this.email) {
        this.errorMessage = 'Email already exists. Do you want to login instead?';
        this.isLoading = false; // Desactivar estado de carga
        return;
      }
    }

    // Simular una llamada asíncrona (por ejemplo, una API)
    setTimeout(() => {
      this.saveUserLocally();
      this.isLoading = false; // Desactivar estado de carga
      this.router.navigate(['/notes']); // Redirigir a la pantalla de notas
    }, 2000); // Simular un retraso de 2 segundos
  }

  saveUserLocally() {
    const user = {
      email: this.email,
      password: this.password,
    };

    localStorage.setItem('user', JSON.stringify(user));
    console.log('User saved locally:', user);
  }
}