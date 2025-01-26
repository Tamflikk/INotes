import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: 'notes', component: MainComponent }, // Ruta para las notas
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'signup', component: SignupComponent }, // Ruta para el signup
  { path: '', redirectTo: '/notes', pathMatch: 'full' }, // Redirigir a /notes por defecto
  { path: '**', redirectTo: '/notes' } // Redirigir cualquier ruta no reconocida a /notes
];