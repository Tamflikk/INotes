import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service'; // Importamos el servicio

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  uniqueTags: string[] = [];
  selectedCategory: string | null = 'All Notes';
  selectedTag: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() tagSelected = new EventEmitter<string>();

  constructor(private noteService: NoteService) {
    this.uniqueTags = this.noteService.getUniqueTags(); // Usamos el servicio
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTag === tag;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedTag = null;
    this.categorySelected.emit(category);
  }

  selectTag(tag: string): void {
    this.selectedTag = tag;
    this.selectedCategory = null;
    this.tagSelected.emit(tag);
  }
}