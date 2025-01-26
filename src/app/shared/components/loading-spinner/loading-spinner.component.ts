import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 z-50">
      <div class="relative w-64 h-80 perspective-600">
        <div class="notebook-loader absolute inset-0 transform-style-3d rotate-y-animation">
          <div class="notebook-page page-1 absolute w-full h-full bg-white border-4 border-blue-500 rounded-lg shadow-2xl 
                      bg-gradient-to-tr from-white via-blue-50 to-blue-100"></div>
          <div class="notebook-page page-2 absolute w-full h-full bg-white border-4 border-purple-500 rounded-lg shadow-2xl 
                      transform rotate-y-30 bg-gradient-to-tr from-white via-purple-50 to-purple-100"></div>
          <div class="notebook-page page-3 absolute w-full h-full bg-white border-4 border-green-500 rounded-lg shadow-2xl 
                      transform rotate-y-60 bg-gradient-to-tr from-white via-green-50 to-green-100"></div>
        </div>
        <div class="absolute bottom-[-70px] w-full text-center">
          <p class="text-xl font-bold text-gray-800 animate-pulse">Cargando notas...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes rotateY {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
    .transform-style-3d {
      transform-style: preserve-3d;
    }
    .rotate-y-animation {
      animation: rotateY 3s linear infinite;
    }
    .rotate-y-30 {
      transform: rotateY(30deg) translateZ(15px);
    }
    .rotate-y-60 {
      transform: rotateY(60deg) translateZ(30px);
    }
    .perspective-600 {
      perspective: 600px;
    }
    .notebook-page {
      backface-visibility: visible !important;
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 1 !important;
    }
    .notebook-loader {
      width: 100%;
      height: 100%;
      transform-origin: center;
    }
  `]
})
export class LoadingSpinnerComponent {}