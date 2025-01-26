import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  @Input() selectedTag: string | null = null;
  @Input() showArchived: boolean = false; // Mostrar notas archivadas o no
  notes: any[] = [];

  constructor(private noteService: NoteService) {
    this.notes = this.noteService.getNotes(this.showArchived);
  }

  // Obtener notas según el tag y el estado de archivado
  getNotes(): any[] {
    if (this.selectedTag) {
      return this.noteService.getNotesByTag(this.selectedTag, this.showArchived);
    }
    return this.noteService.getNotes(this.showArchived);
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