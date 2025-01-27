import { Injectable, EventEmitter } from '@angular/core';

interface Note {
  id: string | null;
  title: string;
  content: string;
  tags: string[];
  lastUpdate: Date;
  archived: boolean;
  hasUnsavedChanges?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private unsavedNotes: Map<string, Note> = new Map();
  
  categoryChanged = new EventEmitter<string>();
  noteArchived = new EventEmitter<string>();
  noteAdded = new EventEmitter<void>();
  
  constructor() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
    
    const unsavedNotesData = sessionStorage.getItem('unsavedNotes');
    if (unsavedNotesData) {
      const unsavedNotesArray = JSON.parse(unsavedNotesData);
      unsavedNotesArray.forEach((note: Note) => {
        if (note.id) {
          this.unsavedNotes.set(note.id, note);
        }
      });
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  private saveUnsavedToSessionStorage(): void {
    sessionStorage.setItem('unsavedNotes', 
      JSON.stringify(Array.from(this.unsavedNotes.values())));
  }

  hasUnsavedChanges(noteId: string): boolean {
    return this.unsavedNotes.has(noteId);
  }

  saveTemporaryChanges(note: Note): void {
    if (note.id) {
      this.unsavedNotes.set(note.id, {...note, hasUnsavedChanges: true});
      this.saveUnsavedToSessionStorage();
    }
  }

  getUnsavedNote(noteId: string): Note | null {
    return this.unsavedNotes.get(noteId) || null;
  }

  clearUnsavedChanges(noteId: string): void {
    this.unsavedNotes.delete(noteId);
    this.saveUnsavedToSessionStorage();
  }

  getNote(id: string): Note | null {
    return this.notes.find(note => note.id === id) || null;
  }

  getNotes(showArchived: boolean = false): Note[] {
    const filteredNotes = this.notes.filter(note => 
      showArchived ? note.archived : !note.archived
    );
    return this.sortNotesByLastUpdate(filteredNotes);
  }

  getNotesByTag(tag: string, archived: boolean = false): Note[] {
    const filteredNotes = this.notes.filter(
      note => note.tags.includes(tag) && note.archived === archived
    );
    return this.sortNotesByLastUpdate(filteredNotes);
  }

  private sortNotesByLastUpdate(notes: Note[]): Note[] {
    return notes.sort((a, b) => 
      new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
    );
  }

  getUniqueTags(): string[] {
    const tags = new Set<string>();
    this.notes.forEach(note => {
      if (!note.archived) {
        note.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }

  addNote(note: Note): void {
    note.id = Date.now().toString();
    this.notes.unshift(note);
    this.saveToLocalStorage();
    this.noteAdded.emit();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.saveToLocalStorage();
    }
  }

  toggleArchiveNote(id: string): void {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.archived = !note.archived;
      note.lastUpdate = new Date();
      this.saveToLocalStorage();
      this.noteArchived.emit(id);
    }
  }

  deleteNote(id: string): void {
    const index = this.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.saveToLocalStorage();
      this.clearUnsavedChanges(id);
    }
  }
}