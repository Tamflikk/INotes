import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="fixed bottom-4 right-4 z-50 flex items-center p-3 space-x-3 bg-white rounded-lg shadow-lg border transition-opacity duration-300"
      [ngClass]="type === 'success' ? 'border-green-500' : 'border-red-500'"
      style="min-width: 400px; height: 50px;"
    >
      <svg
        *ngIf="type === 'success'"
        class="w-5 h-5 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <svg
        *ngIf="type === 'error'"
        class="w-5 h-5 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <p class="text-gray-800 flex-grow">{{ message }}</p>
      <button
        class="text-gray-500 hover:text-gray-700"
        (click)="visible = false"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ToastComponent implements OnDestroy {
  visible = false;
  message = '';
  type: 'success' | 'error' = 'success';
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      this.show(toast.message, toast.type);
    });
  }

  private show(message: string, type: 'success' | 'error') {
    this.message = message;
    this.type = type;
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
