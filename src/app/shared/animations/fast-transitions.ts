import { trigger, transition, style, animate } from '@angular/animations';

export const fastRouteAnimations = [
  trigger('routeFade', [
    transition(':enter', [
      style({ opacity: 0 }), // Estado inicial (invisible)
      animate('300ms ease-out', style({ opacity: 1 })), // Animación de entrada
    ]),
    transition(':leave', [
      animate('300ms ease-out', style({ opacity: 0 })), // Animación de salida
    ]),
  ]),
];