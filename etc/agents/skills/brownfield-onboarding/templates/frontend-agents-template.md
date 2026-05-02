# Frontend Agent Constitution - [Project Name]

> Guidelines for AI agents working on frontend code.
> Last updated: [Date]

## Frontend Context

### Technology Stack
- **Framework**: [React/Vue/Angular/Svelte/etc.]
- **Version**: [version]
- **Build Tool**: [Vite/Webpack/etc.]
- **State Management**: [Redux/Zustand/Pinia/etc.]
- **Styling**: [CSS-in-JS/Tailwind/Sass/CSS Modules]
- **UI Library**: [Material-UI/Ant Design/Chakra/Custom]

### Project Structure
```
[Frontend directory structure]
```

## UI/UX Principles

### Design System

#### Color Palette
```css
/* Primary colors */
--primary: [color]
--secondary: [color]
--accent: [color]

/* Semantic colors */
--success: [color]
--warning: [color]
--error: [color]
--info: [color]
```

#### Typography
- **Heading**: [font and scale]
- **Body**: [font and scale]
- **Monospace**: [font]

#### Spacing Scale
[spacing system: 4px, 8px, 16px, etc.]

#### Breakpoints
```css
--mobile: [breakpoint]
--tablet: [breakpoint]
--desktop: [breakpoint]
```

### Component Patterns

1. **Component Structure**
   - [Preferred component organization]
   - [Props naming conventions]
   - [File naming pattern]

2. **State Management**
   - [When to use local vs. global state]
   - [State update patterns]
   - [Side effects handling]

3. **Styling Approach**
   - [How to style components]
   - [Theme usage]
   - [Responsive design approach]

### Accessibility Standards

- **Keyboard Navigation**: [requirements]
- **Screen Readers**: [ARIA label requirements]
- **Color Contrast**: [minimum contrast ratios]
- **Focus Management**: [focus ring styling and management]
- **Semantic HTML**: [required semantic elements]

## Frontend Coding Principles

### Component Guidelines

1. **Component Composition**
   - Prefer composition over inheritance
   - [Pattern specifics for this project]

2. **Props Validation**
   - [PropTypes/TypeScript requirements]
   - [Required vs. optional props conventions]

3. **Hook Usage** (if React)
   - [Custom hooks location and naming]
   - [Effect dependencies best practices]

4. **Performance**
   - [Memoization strategy]
   - [Code splitting approach]
   - [Image optimization requirements]

### Patterns to Follow

- ✅ [Pattern 1]: [Description]
- ✅ [Pattern 2]: [Description]
- ✅ [Pattern 3]: [Description]

### Anti-Patterns to Avoid

- ❌ [Anti-pattern 1]: [Why and alternative]
- ❌ [Anti-pattern 2]: [Why and alternative]

## API Integration

### API Client
[How API calls are made in this project]

### Error Handling
[How to handle API errors in UI]

### Loading States
[Pattern for loading indicators]

### Data Fetching
[Fetch on mount, lazy loading, pagination approaches]

## Testing Guidelines

- **Unit Tests**: [expectations for component testing]
- **Integration Tests**: [what to test]
- **E2E Tests**: [critical user flows]
- **Testing Library**: [Jest, Testing Library, Cypress, etc.]

## For AI Agents: Frontend Validation

When making frontend changes:
- [ ] Components are accessible (keyboard + screen reader)
- [ ] Responsive across breakpoints
- [ ] Follows design system tokens
- [ ] Loading and error states handled
- [ ] Tests added/updated
- [ ] No console errors or warnings
- [ ] Performance implications considered
