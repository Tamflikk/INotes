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
  @Input() selectedNote: any = null;
  @Output() noteSelected = new EventEmitter<any>();

  constructor(private noteService: NoteService) {}

  isEditorActive: boolean = false;

  ngOnInit() {
    this.noteService.noteAdded.subscribe(() => {
      this.selectedTag = null;
      this.showArchived = false;
    });

    this.noteService.categoryChanged.subscribe((category: string) => {
      this.selectedTag = null;
      this.showArchived = category === 'Archived Notes';
    });
  }

  getNotes(): any[] {
    if (this.selectedTag) {
      return this.noteService.getNotesByTag(this.selectedTag, this.showArchived);
    }
    return this.noteService.getNotes(this.showArchived);
  }

  selectNote(note: any): void {
    this.noteSelected.emit(note);
  }

  hasUnsavedChanges(note: any): boolean {
    return note.id ? this.noteService.hasUnsavedChanges(note.id) : false;
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