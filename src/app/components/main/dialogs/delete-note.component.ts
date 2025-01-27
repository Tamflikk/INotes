import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-note-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <div class="flex items-center">
          <img src="assets/DeleteIcon.png" alt="Delete Icon" class="w-10 h-10 mr-4" />
          <h2 class="text-lg font-semibold">Delete Note</h2>
        </div>
        <p class="text-gray-600 mt-4">Are you sure you want to delete this note? This action cannot be undone.</p>
        <div class="flex justify-end mt-6 space-x-4">
          <button
            (click)="cancel.emit()"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            (click)="confirm.emit()"
            class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DeleteNoteDialogComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
