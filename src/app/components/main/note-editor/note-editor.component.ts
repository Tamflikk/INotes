import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
})
export class NoteEditorComponent {
  @Input() selectedNote: any = null; // Nota seleccionada para editar
  @Output() saveNote = new EventEmitter<any>(); // Evento para guardar la nota
  @Output() cancelEdit = new EventEmitter<void>(); // Evento para cancelar la edición
  @Output() archiveNote = new EventEmitter<void>(); // Evento para archivar/desarchivar la nota
  @Output() deleteNote = new EventEmitter<void>(); // Evento para eliminar la nota

  title: string = '';
  content: string = '';
  tags: string = '';
  isEditing: boolean = false;

  constructor(private noteService: NoteService) {}

  // Cuando se selecciona una nota para editar
  ngOnChanges(): void {
    if (this.selectedNote) {
      this.title = this.selectedNote.title;
      this.content = this.selectedNote.content;
      this.tags = this.selectedNote.tags.join(', ');
      this.isEditing = true;
    } else {
      this.resetForm();
    }
  }

  // Guardar la nota
  onSave(): void {
    const note = {
      id: this.selectedNote ? this.selectedNote.id : null,
      title: this.title,
      content: this.content,
      tags: this.tags.split(',').map((tag: string) => tag.trim()),
      lastUpdate: new Date(),
      archived: this.selectedNote ? this.selectedNote.archived : false,
    };

    // Emitir el evento saveNote en todos los casos
    this.saveNote.emit(note);
    this.resetForm();
  }

  // Cancelar la edición
  onCancel(): void {
    this.cancelEdit.emit();
    this.resetForm();
  }

  // Archivar o desarchivar la nota
  onArchive(): void {
    this.archiveNote.emit(); // Emitir evento para archivar/desarchivar la nota
  }

  // Eliminar la nota
  onDelete(): void {
    this.deleteNote.emit(); // Emitir evento para eliminar la nota
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.isEditing = false;
  }

  // Manejar el guardado con Ctrl + S (o Cmd + S en Mac)
  onKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault(); // Evitar el comportamiento por defecto del navegador
      this.onSave();
    }
  }
}
