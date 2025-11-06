# Planning Guide - Dolphin Blue Paradise

## Before Starting Any Feature

### 1. Understand the Business Context
**Ask yourself:**
- What problem does this solve for guests?
- How does this support the booking journey?
- Does this align with the eco-luxury brand?
- Will this generate leads or bookings?

**Check these files:**
- `memory/product_context.md` - Business model and audiences
- `SITEMAP.md` - Where does this fit in the architecture?
- `STYLEGUIDE.md` - How should this look and feel?

### 2. Define the Scope
**Be clear about:**
- What's included in this feature?
- What's explicitly out of scope?
- What's the MVP vs nice-to-have?
- What's the success criteria?

**Example:**
```
Feature: Room comparison tool
In scope:
- Side-by-side comparison of 2-3 rooms
- Key features (size, guests, amenities)
- Pricing indication (contact for exact rates)
- Mobile responsive

Out of scope:
- Real-time availability
- Online booking
- Reviews/ratings
- 360° tours

MVP: Basic table comparison
Nice-to-have: Interactive toggles, save comparisons

Success: 5% of room page visitors use tool
```

### 3. Consider Bilingual Requirements
**Questions:**
- Does content need translation?
- Are there cultural considerations?
- Will Spanish users have the same experience?
- Do CTAs need different phrasing?

### 4. Map the User Flow
**Sketch out:**
```
User lands on page
  ↓
Sees value proposition
  ↓
Interacts with feature
  ↓
Gets result/value
  ↓
Clear next action (CTA)
  ↓
Lead captured OR directed to booking
```

## Technical Planning

### Architecture Decisions

**Server vs Client Component?**
```
Use SERVER component if:
- No user interaction needed
- Fetching data from database
- No browser APIs required
- No React hooks needed

Use CLIENT component if:
- Event handlers (onClick, etc.)
- React hooks (useState, useEffect)
- Browser APIs (window, localStorage)
- Third-party interactive libraries
```

**API Route or Server Action?**
```
Use API ROUTE if:
- External integrations (EspoCRM)
- Complex validation
- File uploads
- Webhook receivers

Use SERVER ACTION if:
- Simple form mutations
- Inline with component logic
- Better error handling needed
```

**Database Query Location?**
```
Server Component:
- Direct Prisma queries
- No API route needed
- Faster, fewer round trips

API Route:
- Needs authentication
- External systems involved
- Rate limiting required
```

### Data Flow Planning

**Example: Contact Form**
```
┌─────────────┐
│  Form UI    │ (Client Component)
│  - Validation
│  - State
└──────┬──────┘
       │ POST /api/lead
       ↓
┌─────────────┐
│  API Route  │
│  - Validate
│  - Transform
└──────┬──────┘
       │
       ├──→ Prisma (Optional: save to DB)
       │
       └──→ EspoCRM API
            - Create Lead
            - Return success
```

### Component Planning

**Component Hierarchy**
```
Page Component (Server)
├── Hero Section
│   └── CTA Buttons (Client - tracking)
├── Feature Grid (Server)
│   └── Feature Cards
│       └── Interactive Hover (Client)
├── Form Section (Client)
│   ├── Input Fields
│   ├── Validation
│   └── Submit Handler
└── Footer (Server)
```

**Props Interface**
```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  onClick?: () => void;
}
```

## Design Planning

### Layout Structure
```
┌─────────────────────────────┐
│        Header/Nav           │
├─────────────────────────────┤
│         Hero                │
│   (Full width image)        │
├─────────────────────────────┤
│   Content Container         │
│   (Max 1120px, centered)    │
│                             │
│   ┌───────┐  ┌───────┐     │
│   │ Card  │  │ Card  │     │
│   └───────┘  └───────┘     │
├─────────────────────────────┤
│        Footer               │
└─────────────────────────────┘
```

### Responsive Breakpoints
- **Mobile:** < 640px (1 column)
- **Tablet:** 640-1024px (2 columns)
- **Desktop:** > 1024px (3-4 columns)

### Color Planning
```
Primary CTA: Ocean (#0E8BA8)
Hover: Gold (#C7A46B)
Text: Navy (#1B2330)
Background: Sand (#F5EDE3) or White
Accent: Coral (#D8684B) sparingly
```

## CRM Integration Planning

### Form Fields Mapping
```
Website Form          →  EspoCRM Lead
─────────────────────    ─────────────────
name                  →  firstName, lastName, name
email                 →  emailAddress
phone                 →  phoneNumber
message               →  description
[page/source]         →  source
[checkbox]            →  consentEmail
```

### Lead Qualification
**Consider:**
- What information do we need to qualify?
- When should a lead move to next stage?
- What triggers follow-up?
- How do we track source/campaign?

## Content Planning

### Content Requirements
- **Headlines:** Clear value proposition
- **Body copy:** Benefits, not just features
- **CTAs:** Action-oriented, specific
- **Microcopy:** Error messages, labels, hints
- **SEO:** Title, description, keywords

### Bilingual Content Checklist
```
English (EN)                Spanish (ES)
────────────────────        ────────────────────
Page title                  Título de página
Hero headline               Titular principal
Body content                Contenido del cuerpo
CTA buttons                 Botones CTA
Form labels                 Etiquetas de formulario
Error messages              Mensajes de error
Success messages            Mensajes de éxito
Meta description            Meta descripción
```

## Performance Planning

### Optimization Strategy
```
Images:
- WebP format preferred
- Max 200KB per image
- Responsive srcset
- Lazy load below fold

JavaScript:
- Minimize client components
- Dynamic imports for heavy features
- Code splitting automatic

CSS:
- Tailwind (utility-first)
- No unused styles
- Critical CSS inline

API:
- Cache where appropriate
- Batch requests
- Timeout handling
```

## Testing Planning

### Test Cases to Consider
```
Happy Path:
- User completes expected flow
- Gets expected result
- Sees success state

Edge Cases:
- Empty form submission
- Invalid data
- Network errors
- CRM API failures
- Slow connections
- Mobile devices
- Different browsers

Error Recovery:
- Clear error messages
- Alternative actions
- Graceful degradation
```

## Timeline Planning

### Task Breakdown Template
```
Feature: [Feature Name]

Phase 1: Planning (X hours)
- [ ] Review requirements
- [ ] Check existing patterns
- [ ] Design mockup/wireframe
- [ ] Data model planning

Phase 2: Implementation (X hours)
- [ ] Create component structure
- [ ] Implement UI (EN + ES)
- [ ] Add functionality
- [ ] API integration
- [ ] Error handling

Phase 3: Testing (X hours)
- [ ] Manual testing
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] Performance check

Phase 4: Documentation (X hour)
- [ ] Code comments
- [ ] Update memory bank if significant
- [ ] PR description

Total: X hours
```

### Realistic Time Estimates
- Simple page: 4-8 hours
- Form with CRM: 8-16 hours
- Complex feature: 16-40 hours
- Bilingual always adds 30-50%

## Risk Planning

### Common Risks & Mitigation

**Risk: CRM API failure**
- Mitigation: Provide email/WhatsApp fallback
- User message: "Please contact us directly"

**Risk: Slow database queries**
- Mitigation: Add indexes, optimize queries
- Consider caching strategy

**Risk: Mobile layout breaks**
- Mitigation: Test early and often
- Use mobile-first approach

**Risk: Translation incomplete**
- Mitigation: Build both versions together
- Use content checklist

**Risk: Brand inconsistency**
- Mitigation: Reference style guide constantly
- Reuse existing components

## Pre-Development Checklist

Before writing code:

- [ ] Business context understood
- [ ] Scope clearly defined
- [ ] User flow mapped
- [ ] Technical approach decided
- [ ] Component structure planned
- [ ] Data flow understood
- [ ] CRM integration planned (if applicable)
- [ ] Bilingual content prepared
- [ ] Design mockup/wireframe ready
- [ ] Test cases identified
- [ ] Timeline estimated
- [ ] Risks considered

## Communication Planning

### For Team Communication
**Status updates should include:**
- What was completed
- What's in progress
- What's blocked
- Timeline update

### For Stakeholders
**Feature explanations should cover:**
- Business value
- User benefit
- Technical approach
- Timeline and effort

### For Future Developers
**Documentation should include:**
- Why decisions were made
- Alternative approaches considered
- Known limitations
- Future enhancement ideas

---

**Remember:** An hour of planning saves days of rework.

**Last updated:** November 6, 2025
