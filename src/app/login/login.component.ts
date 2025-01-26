import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    this.errorMessage = '';
  
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      this.errorMessage = 'Email does not exist. Please sign up.';
      return;
    }
  
    const user = JSON.parse(savedUser);
  
    if (user.email !== this.email) {
      this.errorMessage = 'Email does not exist. Please sign up.';
      return;
    }
  
    if (user.password !== this.password) {
      this.errorMessage = 'Incorrect password. Please try again.';
      return;
    }
  
    this.isLoading = true;
  
    setTimeout(() => {
      this.isLoading = false; // Restablece el estado de carga
      this.router.navigate(['/notes']);
    }, 3000);
  }
  loginWithGoogle() {
    console.log('Login with Google');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}