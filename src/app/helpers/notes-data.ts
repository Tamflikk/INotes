export const initialNotes = [
    {
      id: 1,
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
      archived: false,
    },
    {
      id: 2,
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
      archived: false,
    },
    {
      id: 3,
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
      tags: ['health', 'fitness'],
      lastUpdate: new Date('2024-10-25'),
      archived: true,
    },
    {
      id: 4,
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
      archived: false,
    },
    {
      id: 5,
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
      archived: true,
    },
  ];
  
  export let nextId = 6;
  