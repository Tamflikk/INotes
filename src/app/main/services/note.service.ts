import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: any[] = [
    {
      title: 'React Performance Optimization',
      content: `1. Code Splitting
- Use React.lazy to load components dynamically.
- Implement dynamic imports for better performance.

2. Memoization
- Use useMemo for expensive calculations.
- Use useCallback to memoize functions.
- Use React.memo to prevent unnecessary re-renders.

3. Virtual List
- Use react-window for rendering large lists.
- Implement infinite scrolling for better UX.

TODO: Benchmark performance improvements.`,
      tags: ['dev', 'react'],
      lastUpdate: new Date('2024-10-29'),
      archived: false // No archivada
    },
    {
      title: 'TypeScript Migration Guide',
      content: `1. Setup TypeScript
- Install TypeScript and configure tsconfig.json.
- Add type definitions for existing libraries.

2. Migrate Components
- Convert JavaScript files to TypeScript.
- Add types for props and state.

3. Testing
- Update tests to work with TypeScript.
- Ensure type safety in tests.

TODO: Document common issues and solutions.`,
      tags: ['dev', 'react', 'typescript'],
      lastUpdate: new Date('2024-10-26'),
      archived: false // No archivada
    },
    {
      title: 'Weekly Workout Plan',
      content: `Monday: Upper Body
- Bench Press: 4 sets of 8-12 reps
- Pull-Ups: 3 sets of 10 reps

Wednesday: Lower Body
- Squats: 4 sets of 8-12 reps
- Deadlifts: 3 sets of 6-8 reps

Friday: Cardio
- Running: 30 minutes
- Cycling: 30 minutes

TODO: Adjust plan based on progress.`,
      tags: ['dev', 'react'],
      lastUpdate: new Date('2024-10-25'),
      archived: true // Archivada
    },
    {
      title: 'React Component Library',
      content: `1. Button Component
- Props: variant, size, onClick
- Styles: primary, secondary, disabled

2. Modal Component
- Props: isOpen, onClose, children
- Styles: overlay, content

3. Input Component
- Props: type, placeholder, value, onChange
- Styles: error state, disabled state

TODO: Add more components and improve documentation.`,
      tags: ['dev', 'react'],
      lastUpdate: new Date('2024-10-15'),
      archived: false // No archivada
    },
    {
      title: 'Reading List',
      content: `1. "Clean Code" by Robert C. Martin
- Focus on writing readable and maintainable code.

2. "Design Patterns" by Erich Gamma
- Learn common design patterns for software development.

3. "You Don't Know JS" by Kyle Simpson
- Deep dive into JavaScript fundamentals.

TODO: Add more books and track progress.`,
      tags: ['personal', 'dev'],
      lastUpdate: new Date('2024-10-05'),
      archived: true // Archivada
    }
  ];

  constructor() { }

  // Obtener todas las notas (no archivadas por defecto)
  getNotes(archived: boolean = false): any[] {
    return this.notes.filter(note => note.archived === archived);
  }

  // Obtener tags únicos (excluyendo notas archivadas)
  getUniqueTags(): string[] {
    const tags = new Set<string>();
    this.notes.forEach(note => {
      if (!note.archived) { // Solo considerar notas no archivadas
        note.tags.forEach((tag: string) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }

  // Agregar una nueva nota
  addNote(note: any): void {
    this.notes.push(note);
  }

  // Filtrar notas por tag (excluyendo notas archivadas)
  getNotesByTag(tag: string, archived: boolean = false): any[] {
    return this.notes.filter(note => note.tags.includes(tag) && note.archived === archived);
  }

  // Archivar o desarchivar una nota
  toggleArchiveNote(noteId: number): void {
    const note = this.notes.find(note => note.id === noteId);
    if (note) {
      note.archived = !note.archived;
    }
  }
}