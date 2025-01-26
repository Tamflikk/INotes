import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Input() selectedCategory: string = 'All Notes'; // Recibe la categoría seleccionada
  @Input() selectedTag: string | null = null; // Recibe el tag seleccionado
  searchQuery: string = ''; // Valor de la barra de búsqueda

  // Método para manejar la búsqueda
  onSearch(): void {
    console.log('Search Query:', this.searchQuery);
    // Aquí puedes implementar la lógica de búsqueda
  }

  // Método para obtener el título dinámico
  getTitle(): string {
    if (this.selectedTag) {
      return `Notes Tagged: ${this.selectedTag}`;
    }
    return this.selectedCategory;
  }
}