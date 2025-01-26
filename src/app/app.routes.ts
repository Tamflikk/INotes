import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'notes', component: MainComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/notes' }, // Ruta no encontrada
];