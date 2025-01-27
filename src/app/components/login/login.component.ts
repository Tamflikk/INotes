import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.authService.login(this.email, this.password)) {
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/notes']);
      }, 2000);
    } else {
      this.errorMessage = 'Invalid email or password.';
      this.isLoading = false;
    }
  }

  loginWithGoogle() {
    console.log('Login with Google');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
