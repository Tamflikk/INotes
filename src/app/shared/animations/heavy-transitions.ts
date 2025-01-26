import { trigger, transition, style, animate } from '@angular/animations';

export const heavyRouteAnimations = [
  trigger('routeSlide', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }), // Entra desde la derecha
      animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
    ]),
    transition(':leave', [
      animate('500ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })), // Sale hacia la izquierda
    ]),
  ]),
];