import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    NoteListComponent,
    NoteEditorComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  selectedCategory: string = 'All Notes';
  selectedTag: string | null = null;
  showArchived: boolean = false;
  isLoading: boolean = true;
  selectedNote: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private noteService: NoteService
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.noteService.noteArchived.subscribe((noteId: string) => {
      if (this.selectedNote && this.selectedNote.id === noteId) {
        const updatedNote = this.noteService.getNote(noteId);
        if (updatedNote) {
          this.selectedNote = updatedNote;
        }
      }
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  onNoteSelected(note: any): void {
    this.selectedNote = note;
  }

  onSaveNote(note: any): void {
    if (note.id) {
      this.noteService.updateNote(note);
    } else {
      this.noteService.addNote(note);
    }

    this.selectedNote = note;
    this.selectedCategory = 'All Notes';
    this.selectedTag = null;
    this.showArchived = false;

    this.noteService.categoryChanged.emit('All Notes');
  }

  onCancelEdit(): void {
    this.selectedNote = null;
  }

  updateSelectedCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedTag = null;
    this.showArchived = category === 'Archived Notes';
    this.selectedNote = null;
  }

  updateSelectedTag(tag: string): void {
    this.selectedTag = tag;
    this.selectedCategory = 'Notes Tagged: ' + tag;
    this.showArchived = false;
    this.selectedNote = null;
  }
}
