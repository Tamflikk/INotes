import { Injectable, EventEmitter } from '@angular/core';
import { initialNotes, nextId } from '../../../helpers/notes-data';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  noteUpdated = new EventEmitter<void>();
  categoryChanged = new EventEmitter<string>();

  private notes = [...initialNotes]; // Copia del array de notas
  private nextId = nextId; // Variable para IDs únicos

  noteAdded = new EventEmitter<void>();

  constructor() {}

  private sortNotesByLastUpdate(notes: any[]): any[] {
    return notes.sort((a, b) => 
      new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
    );
  }

  getNotes(archived: boolean = false): any[] {
    const filteredNotes = this.notes.filter((note) => note.archived === archived);
    return this.sortNotesByLastUpdate(filteredNotes);
  }

  getNotesByTag(tag: string, archived: boolean = false): any[] {
    const filteredNotes = this.notes.filter(
      (note) => note.tags.includes(tag) && note.archived === archived
    );
    return this.sortNotesByLastUpdate(filteredNotes);
  }

  getUniqueTags(): string[] {
    const tags = new Set<string>();
    this.notes.forEach((note) => {
      if (!note.archived) {
        note.tags.forEach((tag: string) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }

  addNote(note: any): void {
    note.id = this.nextId++;
    note.lastUpdate = new Date();
    note.archived = false;
    this.notes.push(note);
    this.noteAdded.emit();
  }

  updateNote(updatedNote: any): void {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = { ...updatedNote };
      this.noteUpdated.emit();
    }
  }

  toggleArchiveNote(noteId: number): void {
    const note = this.notes.find((note) => note.id === noteId);
    if (note) {
      note.archived = !note.archived;
      note.lastUpdate = new Date();
    }
  }

  getNoteById(noteId: number): any {
    return this.notes.find((note) => note.id === noteId);
  }
}
