import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
})
export class NoteEditorComponent implements OnChanges {
  @Input() selectedNote: any = null;
  @Output() saveNote = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  title: string = '';
  content: string = '';
  tags: string = '';
  isEditing: boolean = false;
  hasUnsavedChanges: boolean = false;
  originalNote: any = null;

  constructor(private noteService: NoteService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNote']) {
      if (this.selectedNote) {
        // Verificar si hay cambios no guardados
        const unsavedNote = this.noteService.getUnsavedNote(this.selectedNote.id);
        if (unsavedNote) {
          this.title = unsavedNote.title;
          this.content = unsavedNote.content;
          this.tags = unsavedNote.tags.join(', ');
        } else {
          this.title = this.selectedNote.title;
          this.content = this.selectedNote.content;
          this.tags = this.selectedNote.tags.join(', ');
        }
        this.originalNote = {
          title: this.selectedNote.title,
          content: this.selectedNote.content,
          tags: [...this.selectedNote.tags]
        };
        this.isEditing = true;
      } else {
        this.resetForm();
      }
      this.checkForChanges();
    }
  }

  onInputChange(): void {
    this.checkForChanges();
    if (this.selectedNote?.id) {
      const currentNote = this.getCurrentNoteState();
      this.noteService.saveTemporaryChanges(currentNote);
    }
  }

  private getCurrentNoteState(): any {
    return {
      id: this.selectedNote?.id,
      title: this.title,
      content: this.content,
      tags: this.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastUpdate: new Date(),
      archived: this.selectedNote?.archived || false,
    };
  }

  private checkForChanges(): void {
    if (!this.originalNote) {
      this.hasUnsavedChanges = this.title !== '' || 
                              this.content !== '' || 
                              this.tags !== '';
    } else {
      const currentTags = this.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      this.hasUnsavedChanges = 
        this.title !== this.originalNote.title ||
        this.content !== this.originalNote.content ||
        !this.areTagsEqual(currentTags, this.originalNote.tags);
    }
  }

  private areTagsEqual(tags1: string[], tags2: string[]): boolean {
    return tags1.length === tags2.length && 
           tags1.every(tag => tags2.includes(tag));
  }

  onSave(): void {
    if (!this.hasUnsavedChanges) return;

    const note = this.getCurrentNoteState();
    
    this.saveNote.emit(note);
    if (note.id) {
      this.noteService.clearUnsavedChanges(note.id);
    }
    this.resetForm();
  }

  onCancel(): void {
    if (this.selectedNote?.id) {
      this.noteService.clearUnsavedChanges(this.selectedNote.id);
    }
    this.cancelEdit.emit();
    this.resetForm();
  }

  onArchive(): void {
    if (this.selectedNote?.id) {
      this.noteService.toggleArchiveNote(this.selectedNote.id);
    }
  }

  onDelete(): void {
    if (this.selectedNote?.id) {
      this.noteService.deleteNote(this.selectedNote.id);
      this.resetForm();
      this.cancelEdit.emit();
    }
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.isEditing = false;
    this.hasUnsavedChanges = false;
    this.originalNote = null;
  }

  onKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      this.onSave();
    }
  }
}