# Site Structure Components for DBP Website

This document defines the components needed to display and work with the DBP site structure defined in `SITEMAP.md`. These components will help visualize the site architecture, navigation hierarchy, and page relationships.

## Component Overview

Based on best practices for site architecture visualization and the DBP design system, the following components are recommended:

---

## 1. Navigation Components

### 1.1 `NavigationTree`
**Purpose:** Display the hierarchical site structure as an expandable/collapsible tree view.

**Props:**
```typescript
interface NavigationTreeProps {
  items: NavigationItem[];
  level?: number;
  expandable?: boolean;
  showIcons?: boolean;
  onItemClick?: (item: NavigationItem) => void;
  activePath?: string;
  language?: 'en' | 'es';
}

interface NavigationItem {
  id: string;
  label: string;
  labelEs?: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
  description?: string;
  type?: 'page' | 'section' | 'detail' | 'utility';
}
```

**Features:**
- Expandable/collapsible nodes
- Visual hierarchy with indentation
- Active state highlighting
- Icon support for different page types
- Bilingual support
- Keyboard navigation (arrow keys, enter, space)
- Responsive: stacked on mobile, side-by-side on desktop

**Use Cases:**
- Site architecture documentation
- Admin navigation builder
- Site map visualization page

---

### 1.2 `NavigationCard`
**Purpose:** Display a navigation section as a card with its sub-pages.

**Props:**
```typescript
interface NavigationCardProps {
  title: string;
  titleEs?: string;
  description?: string;
  href: string;
  children?: NavigationItem[];
  icon?: ReactNode;
  color?: 'ocean' | 'gold' | 'navy' | 'sand';
  language?: 'en' | 'es';
}
```

**Features:**
- Card-based layout matching DBP design system
- Hover effects (lift animation)
- Links to main section and sub-pages
- Icon support
- Color variants
- Responsive grid layout

**Use Cases:**
- Homepage navigation overview
- Footer navigation sections
- Site structure overview page

---

### 1.3 `BreadcrumbNavigation`
**Purpose:** Show current page location within site hierarchy.

**Props:**
```typescript
interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  showHome?: boolean;
  language?: 'en' | 'es';
}

interface BreadcrumbItem {
  label: string;
  labelEs?: string;
  href: string;
}
```

**Features:**
- Semantic HTML (`<nav>` with `aria-label`)
- Home icon option
- Customizable separator
- Responsive: truncate on mobile
- Active state for current page

**Use Cases:**
- Page headers
- Article pages
- Detail pages (room, activity, story)

---

## 2. Site Structure Display Components

### 2.1 `SiteStructureGrid`
**Purpose:** Display site structure as a responsive grid of cards.

**Props:**
```typescript
interface SiteStructureGridProps {
  sections: SiteSection[];
  columns?: 2 | 3 | 4;
  showDescriptions?: boolean;
  showIcons?: boolean;
  language?: 'en' | 'es';
}

interface SiteSection {
  id: string;
  title: string;
  titleEs?: string;
  description?: string;
  href: string;
  pages: PageItem[];
  icon?: string;
  color?: string;
}

interface PageItem {
  id: string;
  title: string;
  titleEs?: string;
  href: string;
  type?: 'page' | 'detail' | 'template' | 'utility';
}
```

**Features:**
- Responsive grid (1 col mobile, 2-3 tablet, 3-4 desktop)
- Card-based layout
- Hover interactions
- Section grouping
- Page count indicators
- Color coding by section

**Use Cases:**
- Site overview page
- Admin dashboard
- Content planning view

---

### 2.2 `PageBlueprintCard`
**Purpose:** Display detailed page blueprint information from SITEMAP.md.

**Props:**
```typescript
interface PageBlueprintCardProps {
  page: PageBlueprint;
  language?: 'en' | 'es';
  expanded?: boolean;
  onToggle?: () => void;
}

interface PageBlueprint {
  id: string;
  title: string;
  titleEs?: string;
  href: string;
  purpose?: string;
  purposeEs?: string;
  sections: BlueprintSection[];
  cta?: string;
  ctaEs?: string;
  relatedPages?: string[];
}

interface BlueprintSection {
  type: 'hero' | 'content' | 'gallery' | 'testimonial' | 'cta' | 'form' | 'list';
  title?: string;
  description?: string;
  components?: string[];
}
```

**Features:**
- Expandable/collapsible details
- Section breakdown visualization
- Component list
- Purpose statement
- Related pages links
- Status indicators (draft, in-progress, complete)

**Use Cases:**
- Content planning
- Developer reference
- Design handoff documentation

---

### 2.3 `SiteHierarchyVisualization`
**Purpose:** Visual tree diagram of site structure.

**Props:**
```typescript
interface SiteHierarchyVisualizationProps {
  root: SiteNode;
  orientation?: 'horizontal' | 'vertical';
  showConnectors?: boolean;
  depth?: number;
  language?: 'en' | 'es';
}

interface SiteNode {
  id: string;
  label: string;
  labelEs?: string;
  href?: string;
  children?: SiteNode[];
  type?: 'page' | 'section' | 'detail';
}
```

**Features:**
- Tree diagram layout
- Connector lines
- Clickable nodes
- Zoom/pan support (for large trees)
- Export as image option
- Responsive scaling

**Use Cases:**
- Site architecture documentation
- Stakeholder presentations
- Planning sessions

---

## 3. Navigation Menu Components

### 3.1 `MegaMenu`
**Purpose:** Enhanced dropdown menu showing section with sub-pages.

**Props:**
```typescript
interface MegaMenuProps {
  sections: MegaMenuSection[];
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  activePath?: string;
}

interface MegaMenuSection {
  title: string;
  titleEs?: string;
  href: string;
  description?: string;
  pages: MegaMenuItem[];
  icon?: ReactNode;
}

interface MegaMenuItem {
  title: string;
  titleEs?: string;
  href: string;
  description?: string;
  badge?: string;
}
```

**Features:**
- Multi-column layout
- Section descriptions
- Featured pages
- Badge support (e.g., "New", "Popular")
- Keyboard navigation
- Focus trap
- Mobile-friendly overlay

**Use Cases:**
- Main navigation dropdown
- Header navigation enhancement

---

### 3.2 `MobileNavigationDrawer`
**Purpose:** Full-screen mobile navigation with site structure.

**Props:**
```typescript
interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
  language?: 'en' | 'es';
  activePath?: string;
}
```

**Features:**
- Slide-in drawer animation
- Expandable sections
- Search functionality
- Language toggle
- Close on navigation
- Backdrop overlay

**Use Cases:**
- Mobile menu
- Tablet navigation

---

## 4. Utility Components

### 4.1 `PageTypeBadge`
**Purpose:** Visual indicator for page type.

**Props:**
```typescript
interface PageTypeBadgeProps {
  type: 'page' | 'detail' | 'template' | 'utility' | 'blog' | 'gallery';
  size?: 'sm' | 'md' | 'lg';
}
```

**Features:**
- Color-coded badges
- Icon support
- Size variants
- Accessible labels

**Use Cases:**
- Site structure lists
- Admin interfaces
- Documentation

---

### 4.2 `LanguageToggle`
**Purpose:** Switch between English and Spanish site versions.

**Props:**
```typescript
interface LanguageToggleProps {
  currentLanguage: 'en' | 'es';
  currentPath: string;
  onLanguageChange?: (lang: 'en' | 'es') => void;
  showLabel?: boolean;
}
```

**Features:**
- Path translation
- Visual indicator
- Smooth transition
- Accessible labels

**Use Cases:**
- Header navigation
- Footer
- Site structure pages

---

### 4.3 `SiteStructureSearch`
**Purpose:** Search/filter site structure.

**Props:**
```typescript
interface SiteStructureSearchProps {
  items: NavigationItem[];
  onResultSelect?: (item: NavigationItem) => void;
  placeholder?: string;
  language?: 'en' | 'es';
}
```

**Features:**
- Real-time search
- Fuzzy matching
- Highlight matches
- Keyboard navigation
- Recent searches
- Search suggestions

**Use Cases:**
- Site map page
- Admin navigation
- Quick page finder

---

## 5. Data Structure Components

### 5.1 `SiteStructureProvider`
**Purpose:** Context provider for site structure data.

**Features:**
- Centralized site structure data
- Language switching
- Active path tracking
- Caching
- TypeScript types

**Use Cases:**
- App-wide site structure access
- Navigation components
- Breadcrumbs

---

### 5.2 `SiteStructureData`
**Purpose:** TypeScript types and data structure for site structure.

**Data Structure:**
```typescript
interface SiteStructure {
  version: string;
  lastUpdated: string;
  languages: ('en' | 'es')[];
  sections: SiteSection[];
  utilityPages: PageItem[];
  metadata: {
    totalPages: number;
    totalSections: number;
    languages: string[];
  };
}
```

**Features:**
- Type-safe data structure
- Validation
- Export/import
- Version tracking

---

## 6. Implementation Priority

### Phase 1: Core Navigation (High Priority)
1. `NavigationTree` - For site structure visualization
2. `NavigationCard` - For homepage/footer navigation
3. `BreadcrumbNavigation` - For page context
4. `SiteStructureData` - Data structure foundation

### Phase 2: Enhanced Display (Medium Priority)
5. `SiteStructureGrid` - Grid view of site structure
6. `MegaMenu` - Enhanced navigation dropdown
7. `MobileNavigationDrawer` - Mobile navigation
8. `LanguageToggle` - Language switching

### Phase 3: Advanced Features (Lower Priority)
9. `PageBlueprintCard` - Detailed page information
10. `SiteHierarchyVisualization` - Tree diagram
11. `SiteStructureSearch` - Search functionality
12. `PageTypeBadge` - Visual indicators
13. `SiteStructureProvider` - Context provider

---

## 7. Design System Integration

All components should follow the DBP design system:

- **Colors:** Use CSS variables (`--color-ocean`, `--color-navy`, `--color-gold`, etc.)
- **Typography:** `Playfair Display` for headings, `Source Sans Pro` for body
- **Spacing:** Use spacing scale (4, 8, 16, 24, 32, 48, 72px)
- **Shadows:** Use `--shadow-soft` for cards
- **Transitions:** 200ms ease for interactions
- **Responsive:** Mobile-first, breakpoints at 576px, 768px, 992px, 1200px
- **Accessibility:** ARIA labels, keyboard navigation, focus states

---

## 8. Best Practices

1. **Hierarchical Structure:** Always maintain clear parent-child relationships
2. **Bilingual Support:** All components should support English and Spanish
3. **Accessibility:** Keyboard navigation, screen reader support, focus management
4. **Performance:** Lazy load large trees, virtualize long lists
5. **Responsive:** Mobile-first design, touch-friendly targets (≥48px)
6. **Type Safety:** Full TypeScript support with proper interfaces
7. **Consistency:** Reuse existing components (Button, Card) where possible
8. **Documentation:** JSDoc comments for all props and interfaces

---

## 9. Example Usage

```typescript
// Site Structure Data
const siteStructure: SiteStructure = {
  version: '1.0.0',
  lastUpdated: '2024-01-15',
  languages: ['en', 'es'],
  sections: [
    {
      id: 'rooms',
      title: 'Rooms & Suites',
      titleEs: 'Habitaciones',
      href: '/rooms',
      pages: [
        { id: 'premium-deluxe', title: 'Premium Deluxe Cabana', href: '/rooms/premium-deluxe' },
        // ... more pages
      ]
    },
    // ... more sections
  ]
};

// Navigation Tree Component
<NavigationTree 
  items={siteStructure.sections}
  language="en"
  expandable={true}
  activePath="/rooms/premium-deluxe"
/>

// Navigation Grid
<SiteStructureGrid 
  sections={siteStructure.sections}
  columns={3}
  language="en"
  showDescriptions={true}
/>
```

---

## 10. Next Steps

1. Review and approve component list
2. Create TypeScript interfaces/types file
3. Build data structure from SITEMAP.md
4. Implement Phase 1 components
5. Test with existing navigation
6. Integrate into site
7. Document usage examples

