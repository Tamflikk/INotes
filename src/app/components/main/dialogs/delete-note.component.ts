// src/app/main/dialogs/delete-note-dialog.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-note-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay -->
    <button
      [disabled]="!noteId"
      (click)="showDialog = true"
      class="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img src="assets/Delete.png" alt="Delete" class="w-4 h-4 mr-2" />
      Delete Note
    </button>

    <!-- Dialog -->
    <div
      *ngIf="showDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
      >
        <!-- Header -->
        <div class="p-6 pb-0">
          <h2 class="text-lg font-semibold text-gray-900">Delete Note</h2>
          <p class="mt-2 text-sm text-gray-500">
            Are you sure you want to permanently delete this note? This action
            cannot be undone.
          </p>
        </div>

        <!-- Footer -->
        <div class="p-6 pt-4 flex justify-end space-x-3">
          <button
            class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            (click)="showDialog = false"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            (click)="onConfirmDelete()"
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DeleteNoteDialogComponent {
  @Input() noteId: string | null = null;
  @Output() deleteConfirmed = new EventEmitter<string>();

  showDialog = false;

  onConfirmDelete() {
    if (this.noteId) {
      this.deleteConfirmed.emit(this.noteId);
      this.showDialog = false;
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('bg-black')) {
      this.showDialog = false;
    }
  }
}
