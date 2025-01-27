import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../services/note.service'; // Importamos el servicio

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  uniqueTags: string[] = [];
  selectedCategory: string | null = 'All Notes';
  selectedTag: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() tagSelected = new EventEmitter<string>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.uniqueTags = this.noteService.getUniqueTags();

    this.noteService.noteAdded.subscribe(() => {
      this.uniqueTags = this.noteService.getUniqueTags();
      this.selectedCategory = 'All Notes';
      this.selectedTag = null;
    });

    this.noteService.categoryChanged.subscribe((category: string) => {
      this.selectedCategory = category;
      this.selectedTag = null;
    });
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
