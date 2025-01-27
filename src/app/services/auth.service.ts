import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user';
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private router: Router) {}

  // Method to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && 
             typeof localStorage !== 'undefined' && 
             localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  // Login method
  login(email: string, password: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem(this.IS_LOGGED_IN_KEY, 'true');
        return true;
      }
    }
    return false;
  }

  // Logout method
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.IS_LOGGED_IN_KEY);
      this.router.navigate(['/login']);
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return localStorage.getItem(this.IS_LOGGED_IN_KEY) === 'true';
  }

  // Sign up method
  signUp(email: string, password: string): void {
    if (this.isLocalStorageAvailable()) {
      const user = { email, password };
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.IS_LOGGED_IN_KEY, 'true');
    }
  }

  // app/services/auth.service.ts

changePassword(currentPassword: string, newPassword: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!this.isLocalStorageAvailable()) {
      return reject('LocalStorage no está disponible.');
    }

    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (user.password !== currentPassword) {
        return reject('La contraseña actual no es correcta.');
      }

      user.password = newPassword; // Actualiza la contraseña
      localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Guarda los cambios
      resolve();
    } else {
      reject('Usuario no encontrado.');
    }
  });
}

}