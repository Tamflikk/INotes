import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

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
    LoadingSpinnerComponent, // Solo componentes y CommonModule
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  selectedCategory: string = 'All Notes';
  selectedTag: string | null = null;
  showArchived: boolean = false;
  isLoading: boolean = true; // Estado de carga

  constructor() {
    // Simula una carga de 3 segundos
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
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