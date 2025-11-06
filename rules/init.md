# Project Initialization & Context - Dolphin Blue Paradise

## Project Identity
**Name:** Dolphin Blue Paradise Website  
**Codename:** DBP  
**Type:** Eco-luxury resort web platform  
**Tech Stack:** Next.js 15, TypeScript, Tailwind, Prisma, PostgreSQL

## First Things to Know

### 1. This is a REAL Business
- **4-room boutique eco-resort** in Bocas del Toro, Panama
- **Off-grid location** (solar power, rainwater, jungle/sea access)
- **Bilingual operation** (English primary, Spanish full mirror)
- **Manual booking process** (no automated system yet)
- **CRM-driven marketing** (EspoCRM for lead management)

### 2. Project State
- **Status:** Active development, preparing for production
- **Recent:** Major cleanup completed (Nov 6, 2025)
- **Blog:** Admin system built, public pages pending
- **CRM:** EspoCRM integrated and working
- **Hosting:** Railway (auto-deploy from main branch)

### 3. Key Files to Read First
1. `memory/product_context.md` - Business context, audiences, CRM ecosystem
2. `memory/active_context.md` - Technical state, recent changes, known issues
3. `STYLEGUIDE.md` - UI/UX design system (CRITICAL for any UI work)
4. `README.md` - Quick reference and setup guide

## Critical Constraints

### UI/Design
- **MUST follow** the style guide (`STYLEGUIDE.md`)
- **Brand colors:** Ocean (#0E8BA8), Navy (#1B2330), Sand (#F5EDE3), Gold (#C7A46B)
- **Fonts:** Playfair Display (display), Source Sans Pro (body)
- **Tone:** Warm, sophisticated, eco-conscious, service-forward

### Bilingual Requirements
- **All pages** must have English AND Spanish versions
- **URL structure:** English at `/`, Spanish at `/es/`
- **Content parity:** Both languages should have equivalent information
- **Don't translate:** Brand names, location names, staff names

### CRM Integration
- **Forms → EspoCRM:** All lead capture goes through EspoCRM API
- **Data privacy:** Capture consent flags, follow GDPR principles
- **Lead stages:** New → Qualified → Proposal → Tentative → Converted
- **Newsletter:** Separate from general leads, consent=true

### Code Standards
- **TypeScript strict mode:** All code must type-check
- **Server components:** Default to RSC, client components only when needed
- **API routes:** Follow existing patterns in `/api/`
- **Error handling:** Graceful failures, user-friendly messages
- **No console.logs:** Except intentional logging

## Project Structure Quick Reference

```
apps/web/src/
├── app/
│   ├── [page].tsx              # English pages
│   ├── es/[page].tsx           # Spanish pages
│   ├── admin/                  # Admin panel (auth required)
│   └── api/                    # API routes
├── components/
│   ├── site-header.tsx         # English nav
│   ├── site-header-es.tsx      # Spanish nav
│   ├── site-footer.tsx         # English footer
│   ├── site-footer-es.tsx      # Spanish footer
│   └── [others].tsx            # Shared components
├── content/
│   ├── data.ts                 # English content
│   ├── data-es.ts              # Spanish content
│   └── stories.ts              # Story data
└── lib/
    ├── auth.ts                 # NextAuth config
    ├── db.ts                   # Prisma client
    └── env.ts                  # Environment validation
```

## Common Tasks

### Adding a New Page
1. Create English version: `app/[page]/page.tsx`
2. Create Spanish version: `app/es/[page]/page.tsx`
3. Update navigation in headers
4. Follow existing page patterns
5. Use appropriate components

### Adding a Form
1. Define schema with Zod
2. Use React Hook Form
3. Connect to API route
4. API route pushes to EspoCRM
5. Show success/error states
6. Follow privacy best practices

### API Route Pattern
```typescript
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  // Define fields
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    
    // Process data
    // Call EspoCRM if needed
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Message" },
      { status: 400 }
    );
  }
}
```

## Important URLs & Credentials

### Local Development
- **App:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login
- **Database:** Configured via DATABASE_URL

### Production (Railway)
- **Web:** [Railway domain]
- **EspoCRM:** [CRM URL]
- **Chatwoot:** [Chat URL]

### Test Accounts
- **Admin:** Email/password from env vars
- **EspoCRM:** Separate admin access

## What NOT to Do

❌ **Don't** break the style guide  
❌ **Don't** add dependencies without justification  
❌ **Don't** commit API keys or secrets  
❌ **Don't** skip TypeScript types  
❌ **Don't** forget Spanish translations  
❌ **Don't** remove existing functionality without approval  
❌ **Don't** use client components unnecessarily  
❌ **Don't** hardcode URLs (use env vars)  

## What to DO

✅ **Do** read `memory/` files for context  
✅ **Do** follow existing code patterns  
✅ **Do** test on mobile and desktop  
✅ **Do** maintain bilingual parity  
✅ **Do** handle errors gracefully  
✅ **Do** write self-documenting code  
✅ **Do** update documentation when needed  
✅ **Do** ask questions if unclear  

## CRM Context (Critical for Forms)

### EspoCRM Lead Structure
```typescript
{
  firstName: string,
  lastName: string,
  name: string,              // Full name
  emailAddress: string,
  phoneNumber?: string,
  preferredLanguage?: "en" | "es",
  travelDates?: string,
  partySize?: number,
  interests?: string[],
  source: string,            // "Website", "Newsletter", etc.
  description?: string,
  consentEmail?: boolean,    // Newsletter opt-in
}
```

### Form → CRM Flow
1. User submits form on website
2. Form validates with Zod
3. POST to `/api/lead` or `/api/newsletter`
4. API route formats data for EspoCRM
5. Fetch to EspoCRM REST API
6. Handle response (success/error)
7. Return to frontend
8. Show confirmation

### Error Handling
- **Network errors:** "Unable to connect, please try WhatsApp"
- **Validation errors:** Specific field feedback
- **CRM errors:** Fallback to email/WhatsApp contact
- **Always:** Provide alternative contact methods

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_URL` - Site URL
- `NEXTAUTH_SECRET` - Random secure string
- `ADMIN_EMAIL` - Admin login
- `ADMIN_PASSWORD` - Admin password

### Optional (for full features)
- `ESPOCRM_URL` - CRM API endpoint
- `ESPOCRM_API_KEY` - CRM API key
- `CHATWOOT_BASE_URL` - Chat server
- `CHATWOOT_TOKEN` - Chat token
- `GTM_ID` - Google Tag Manager

## Development Mindset

### Think Like a Concierge
- **Personalized:** Every interaction should feel tailored
- **Helpful:** Provide answers, not just forms
- **Warm:** Friendly, approachable, not corporate
- **Reliable:** Everything should work smoothly

### Think Sustainability
- **Efficient:** Optimize images, reduce JS bundle
- **Accessible:** Everyone should be able to use the site
- **Performant:** Fast load times matter
- **Maintainable:** Code should be easy to update

### Think Bilingual
- **Always both:** Never just English
- **Cultural awareness:** Spanish isn't just translation
- **Navigation parity:** Both languages equal priority
- **Testing:** Check both versions thoroughly

## Getting Help

### Resources
1. **Memory bank:** `memory/` - Most complete context
2. **Style guide:** `STYLEGUIDE.md` - All design decisions
3. **Sitemap:** `SITEMAP.md` - Page architecture
4. **Build journal:** `docs/BUILD-JOURNAL.md` - Historical context

### Questions to Ask
- "What's the business goal of this feature?"
- "How does this affect the guest journey?"
- "Does this work in Spanish too?"
- "How does this integrate with EspoCRM?"
- "Is this consistent with the brand?"

### When Stuck
1. Check existing similar implementations
2. Review memory bank context
3. Consult style guide for UI questions
4. Ask before making breaking changes
5. Document your decision rationale

---

**Remember:** This is a real business serving real guests. Quality and attention to detail matter. Every line of code affects someone's booking experience.

**Last updated:** November 6, 2025
