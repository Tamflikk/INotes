import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent {
  @Input() selectedTag: string | null = null;
  @Input() showArchived: boolean = false;
  @Input() selectedNote: any = null; // Nota seleccionada
  @Output() noteSelected = new EventEmitter<any>(); // Evento para seleccionar una nota

  constructor(private noteService: NoteService) {}

  // Obtener notas según el tag y el estado de archivado
  getNotes(): any[] {
    if (this.selectedTag) {
      return this.noteService.getNotesByTag(this.selectedTag, this.showArchived);
    }
    return this.noteService.getNotes(this.showArchived);
  }

  // Seleccionar una nota
  selectNote(note: any): void {
    this.noteSelected.emit(note); // Emitir la nota seleccionada
  }

  // Obtener el texto descriptivo
  getDescription(): string {
    if (this.showArchived) {
      return 'All archived notes are shown here.';
    } else if (this.selectedTag) {
      return `All notes with the "${this.selectedTag}" tag are shown here.`;
    }
    return '';
  }
}