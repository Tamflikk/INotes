import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent implements OnInit {
  @Input() selectedTag: string | null = null;
  @Input() showArchived: boolean = false;
  @Input() selectedNote: any = null;  // Esta input es crucial
  @Output() noteSelected = new EventEmitter<any>();

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    // Suscribirse a los cambios cuando se añade una nota
    this.noteService.noteAdded.subscribe(() => {
      this.selectedTag = null;
      this.showArchived = false;
    });

    // Suscribirse a los cambios de categoría
    this.noteService.categoryChanged.subscribe((category: string) => {
      this.selectedTag = null;
      this.showArchived = category === 'Archived Notes';
    });
  }

  // Resto de los métodos igual...
  getNotes(): any[] {
    if (this.selectedTag) {
      return this.noteService.getNotesByTag(this.selectedTag, this.showArchived);
    }
    return this.noteService.getNotes(this.showArchived);
  }

  selectNote(note: any): void {
    this.noteSelected.emit(note);
  }

  getDescription(): string {
    if (this.showArchived) {
      return 'All archived notes are shown here.';
    } else if (this.selectedTag) {
      return `All notes with the "${this.selectedTag}" tag are shown here.`;
    }
    return '';
  }
}