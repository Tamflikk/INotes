// app/components/main/settings-menu/settings-menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-menu.component.html'
})
export class SettingsMenuComponent {
  isMenuOpen = false;
  showPasswordPanel = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openChangePassword() {
    this.isMenuOpen = false;
  
    // Activar el panel con un pequeño retraso para permitir transiciones suaves
    setTimeout(() => {
      this.showPasswordPanel = true;
    }, 10);
  }  

  closePasswordPanel() {
    this.showPasswordPanel = false;
    this.resetForm();
  }

  resetForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    
    if (this.newPassword.length < 8) {
      this.toastService.show('Password must be at least 8 characters long', 'error');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toastService.show('New passwords do not match', 'error');
      return;
    }

    try {
      // Assuming authService has a changePassword method
      await this.authService.changePassword(this.currentPassword, this.newPassword);
      this.toastService.show('Password changed successfully!', 'success');
      this.closePasswordPanel();
    } catch (error) {
      this.toastService.show('Failed to change password', 'error');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}