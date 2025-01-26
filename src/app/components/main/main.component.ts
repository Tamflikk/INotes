import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
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
    RightSidebarComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  selectedCategory: string = 'All Notes';
  selectedTag: string | null = null;
  showArchived: boolean = false;
  isLoading: boolean = true;
  selectedNote: any = null; // Nota seleccionada para editar

  constructor(
    private authService: AuthService,
    private router: Router,
    private noteService: NoteService
  ) {
    // Verifica si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    // Simula una carga de 3 segundos
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  // Seleccionar una nota
  onNoteSelected(note: any): void {
    this.selectedNote = note; // Actualizar la nota seleccionada
  }

  // Guardar la nota
  onSaveNote(note: any): void {
    if (note.id) {
      // Actualizar la nota existente
      const existingNote = this.noteService.getNoteById(note.id);
      if (existingNote) {
        Object.assign(existingNote, note);
      }
    } else {
      // Crear una nueva nota
      this.noteService.addNote(note);
      this.selectedNote = note; // Mantener la nota seleccionada
    }

    // Cambiar a la categoría "All Notes"
    this.selectedCategory = 'All Notes';
    this.selectedTag = null;
  }

  // Cancelar la edición
  onCancelEdit(): void {
    this.selectedNote = null; // Reiniciar la selección
  }

  updateSelectedCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedTag = null;
    this.showArchived = category === 'Archived Notes';
    console.log('Categoría seleccionada:', category);
  }

  updateSelectedTag(tag: string): void {
    this.selectedTag = tag;
    this.selectedCategory = 'Notes Tagged: ' + tag;
    this.showArchived = false;
    console.log('Tag seleccionado:', tag);
  }
}