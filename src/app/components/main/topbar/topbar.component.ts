import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, SettingsMenuComponent],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Input() selectedCategory: string = 'All Notes'; // Recibe la categoría seleccionada
  @Input() selectedTag: string | null = null; // Recibe el tag seleccionado
  searchQuery: string = ''; // Valor de la barra de búsqueda

  constructor(private noteService: NoteService) {}

  onSearch(): void {
    this.noteService.searchQueryChanged.emit(this.searchQuery);
    if (this.searchQuery) {
      this.noteService.categoryChanged.emit('All Notes');
    }
  }

  // Método para obtener el título dinámico
  getTitle(): string {
    if (this.selectedTag) {
      return `Notes Tagged: ${this.selectedTag}`;
    }
    return this.selectedCategory;
  }
}