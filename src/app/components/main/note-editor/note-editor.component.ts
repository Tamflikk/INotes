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
      id: this.selectedNote ? this.selectedNote.id : null, // Mantener el ID si es una edición
      title: this.title,
      content: this.content,
      tags: this.tags.split(',').map((tag: string) => tag.trim()),
      lastUpdate: new Date(),
      archived: false,
    };

    if (this.isEditing) {
      // Actualizar la nota existente
      Object.assign(this.selectedNote, note);
    } else {
      // Crear una nueva nota
      this.saveNote.emit(note); // Emitir la nueva nota para que MainComponent la guarde
    }
  }

  // Cancelar la edición
  onCancel(): void {
    this.cancelEdit.emit();
    this.resetForm();
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