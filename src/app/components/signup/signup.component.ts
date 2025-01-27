import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      this.isLoading = false;
      return;
    }

    if (this.password.length < 8 || this.password.length > 32) {
      this.errorMessage = 'Password must be between 8 and 32 characters.';
      this.isLoading = false;
      return;
    }

    this.authService.signUp(this.email, this.password);
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/notes']);
    }, 2000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
