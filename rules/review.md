# Code Review Checklist - Dolphin Blue Paradise

## Pre-Review Self-Check

Before submitting code for review or committing:

### Code Quality
- [ ] TypeScript types are explicit and correct
- [ ] No `any` types (unless absolutely necessary with comment)
- [ ] No unused variables or imports
- [ ] No commented-out code
- [ ] Console.logs removed (except intentional logging)
- [ ] Error handling implemented
- [ ] Edge cases considered

### Functionality
- [ ] Feature works as intended
- [ ] Forms submit successfully
- [ ] API routes return expected responses
- [ ] Database queries execute correctly
- [ ] Authentication works if applicable
- [ ] CRM integration tested (if applicable)

### UI/UX
- [ ] Follows style guide (`STYLEGUIDE.md`)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Loading states implemented
- [ ] Error states user-friendly
- [ ] Success feedback provided
- [ ] Consistent with existing pages

### Bilingual
- [ ] English version complete
- [ ] Spanish version complete
- [ ] Content parity maintained
- [ ] Navigation updated in both languages
- [ ] Both versions tested

### Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile device or emulator
- [ ] Tested with slow network
- [ ] Tested error scenarios

## Technical Review Points

### Architecture
- [ ] Component is in the right directory
- [ ] Server component unless client features needed
- [ ] API routes follow existing patterns
- [ ] Database queries optimized
- [ ] No N+1 queries

### Security
- [ ] No hardcoded secrets
- [ ] API routes authenticated if needed
- [ ] Input validation on forms
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevention considered

### Performance
- [ ] Images optimized
- [ ] No unnecessary re-renders
- [ ] Database queries select only needed fields
- [ ] Large components lazy-loaded if appropriate
- [ ] Bundle size impact considered

### Maintainability
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] Follows existing conventions
- [ ] Reuses existing components where possible
- [ ] No duplication

## Brand Alignment Review

### Visual Design
- [ ] Colors from brand palette
- [ ] Correct fonts (Playfair Display, Source Sans Pro)
- [ ] Spacing follows grid (4, 8, 16, 24, 32, 48, 72px)
- [ ] Animations smooth and subtle (200-400ms)
- [ ] Icons consistent style

### Tone & Voice
- [ ] Warm and sophisticated language
- [ ] Not too corporate or cold
- [ ] Eco-conscious messaging appropriate
- [ ] Service-forward approach
- [ ] Appropriate for luxury market

### User Experience
- [ ] Clear call-to-actions
- [ ] Easy navigation
- [ ] Helpful error messages
- [ ] Intuitive workflows
- [ ] Mobile-friendly interactions

## CRM Integration Review (If Applicable)

### Data Flow
- [ ] Form data maps to EspoCRM fields correctly
- [ ] Name split into firstName/lastName
- [ ] Consent flags captured properly
- [ ] Source tracking included
- [ ] Error handling for CRM failures

### Privacy & Consent
- [ ] Privacy policy linked
- [ ] Consent checkbox for marketing (if applicable)
- [ ] User can proceed if CRM fails
- [ ] Alternative contact methods provided

### Testing
- [ ] Lead created in EspoCRM
- [ ] All fields populated correctly
- [ ] Handles CRM API errors gracefully
- [ ] Retry logic works if needed

## SEO Review

### Meta Tags
- [ ] Title tag present and unique
- [ ] Meta description compelling
- [ ] Open Graph tags for social sharing
- [ ] Alt text on all images
- [ ] Heading hierarchy (H1, H2, H3)

### Technical SEO
- [ ] URLs semantic and clean
- [ ] Canonical tags if needed
- [ ] No broken links
- [ ] Sitemap updated if new pages
- [ ] Robots.txt respected

## Accessibility Review

### ARIA & Semantics
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Form labels associated
- [ ] Buttons have descriptive text
- [ ] Links have clear purpose

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible
- [ ] Tab order logical
- [ ] Skip links for screen readers
- [ ] No keyboard traps

### Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Interactive elements contrast ≥ 3:1
- [ ] Not relying solely on color
- [ ] Color-blind friendly

## Mobile-Specific Review

### Responsive Design
- [ ] Layout adapts to small screens
- [ ] Text readable without zooming
- [ ] Tap targets ≥ 48x48px
- [ ] No horizontal scrolling
- [ ] Images scale appropriately

### Performance
- [ ] Fast load on 3G
- [ ] Images optimized for mobile
- [ ] No large JavaScript bundles
- [ ] Critical CSS inlined if needed

### Touch Interactions
- [ ] Swipe gestures work (if applicable)
- [ ] No hover-only interactions
- [ ] Touch feedback provided
- [ ] Forms mobile-optimized

## Documentation Review

### Code Comments
- [ ] Complex logic explained
- [ ] Business context provided where relevant
- [ ] TODOs have context
- [ ] Why, not just what

### External Documentation
- [ ] README updated if needed
- [ ] API documented if new routes
- [ ] Memory bank updated if significant change
- [ ] CHANGELOG updated (if maintaining one)

## Final Checks

### Git
- [ ] Commit message descriptive
- [ ] No large files committed
- [ ] .gitignore respected
- [ ] Branch named appropriately
- [ ] No merge conflicts

### Deployment
- [ ] Environment variables documented
- [ ] Database migrations prepared
- [ ] Rollback plan considered
- [ ] Monitoring in place

### Handoff
- [ ] PR description complete
- [ ] Screenshots attached
- [ ] Testing instructions provided
- [ ] Known issues documented

## Review Standards

### Critical Issues (Must Fix)
- Security vulnerabilities
- Data loss risks
- Breaking changes
- Accessibility violations
- Brand guideline violations

### Major Issues (Should Fix)
- Performance problems
- User experience issues
- Code quality concerns
- Missing error handling
- Incomplete features

### Minor Issues (Nice to Fix)
- Code style inconsistencies
- Missing comments
- Optimization opportunities
- Refactoring suggestions

## Common Pitfalls to Avoid

### Technical
- ❌ Using client component unnecessarily
- ❌ Forgetting error boundaries
- ❌ Not handling loading states
- ❌ Hardcoding URLs or API keys
- ❌ Ignoring TypeScript errors

### UX
- ❌ No feedback on form submission
- ❌ Error messages too technical
- ❌ Missing alternative contact methods
- ❌ Inconsistent button styles
- ❌ Forgetting mobile users

### Process
- ❌ Skipping Spanish translation
- ❌ Not testing in production-like environment
- ❌ Committing directly to main
- ❌ Not updating documentation
- ❌ Ignoring linter warnings

## Review Approval Criteria

Code is ready to merge when:

✅ All functionality works correctly  
✅ Tests pass  
✅ Style guide followed  
✅ Bilingual parity maintained  
✅ Accessible and responsive  
✅ Performance acceptable  
✅ Security reviewed  
✅ Documentation updated  
✅ No critical or major issues  

---

**Remember:** Every commit represents the brand. Review with care.

**Last updated:** November 6, 2025
