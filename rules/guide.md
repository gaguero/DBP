# Development Guide - Dolphin Blue Paradise

## Core Principles

### 1. **Brand First**
Every change must align with the brand identity:
- Warm, sophisticated, eco-conscious
- Barefoot luxury, not corporate sterility
- Personal service, not automated transactions
- Sustainability as action, not marketing

### 2. **Bilingual Always**
- Never ship English-only features
- Spanish is not an afterthought
- Test both languages thoroughly
- Content parity is non-negotiable

### 3. **CRM-Centric**
- All leads flow to EspoCRM
- Capture proper consent flags
- Track sources for attribution
- Enable follow-up workflows

### 4. **Quality Over Speed**
- Better to get it right than get it done
- Test across devices and browsers
- Handle edge cases gracefully
- Write code you'd be proud to maintain

## UI Development

### Component Architecture

**Server Components (Default)**
```typescript
// app/[page]/page.tsx
import { Component } from "@/components/component";

export default async function Page() {
  // Fetch data here if needed
  return <Component />;
}
```

**Client Components (When Needed)**
```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState();
  // Interactive logic
}
```

**Use client components ONLY for:**
- Event handlers (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (window, document, etc.)
- Third-party libraries requiring client-side

### Styling Guidelines

**Tailwind Classes (Preferred)**
```tsx
<div className="bg-[var(--color-sand)] px-4 py-6 rounded-lg">
  <h2 className="font-display text-3xl text-[var(--color-navy)]">
    Heading
  </h2>
  <p className="text-base leading-7 text-[var(--color-text-primary)]">
    Body text
  </p>
</div>
```

**CSS Variables (For Brand Colors)**
```css
--color-ocean: #0E8BA8;
--color-navy: #1B2330;
--color-sand: #F5EDE3;
--color-gold: #C7A46B;
--color-coral: #D8684B;
--color-forest: #3E5C4A;
```

**Responsive Design**
```tsx
// Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  // Breakpoints: sm:640px md:768px lg:1024px xl:1280px
</div>
```

### Typography Patterns

```tsx
// Display Heading (Hero)
<h1 className="font-display text-5xl md:text-6xl text-[var(--color-navy)]">
  Paradise Between Jungle & Sea
</h1>

// Section Heading
<h2 className="font-display text-3xl md:text-4xl text-[var(--color-navy)]">
  Our Rooms
</h2>

// Subheading
<h3 className="font-sans text-xl md:text-2xl font-semibold text-[var(--color-navy)]">
  Premium Deluxe Cabana
</h3>

// Body Text
<p className="font-sans text-base leading-7 text-[var(--color-text-primary)]">
  Body content here
</p>

// Meta Text
<span className="font-sans text-sm text-gray-600">
  2 guests • 33 m²
</span>
```

### Button Patterns

```tsx
// Primary CTA
<button className="bg-[var(--color-ocean)] hover:bg-[var(--color-gold)] text-white px-6 py-3 rounded-md font-semibold transition-colors">
  Book Now
</button>

// Secondary CTA
<button className="border-2 border-[var(--color-navy)] hover:bg-[var(--color-sand)] text-[var(--color-navy)] px-6 py-3 rounded-md font-semibold transition-colors">
  Learn More
</button>

// Text Link
<a href="#" className="text-[var(--color-ocean)] hover:underline">
  Read more
</a>
```

## Form Development

### Form Pattern with React Hook Form + Zod

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Define schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error();
      
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Form fields */}
      <div>
        <label className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
          Name
        </label>
        <input
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md">
          Thank you! We'll be in touch soon.
        </div>
      )}
      
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          Something went wrong. Please try WhatsApp or email.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[var(--color-ocean)] hover:bg-[var(--color-gold)] text-white px-6 py-3 rounded-md font-semibold transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

## API Route Development

### Standard API Route Pattern

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";

// Define and export schema for reuse
export const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate
    const body = await request.json();
    const data = leadSchema.parse(body);
    
    // Transform for EspoCRM
    const [firstName, ...lastName] = data.name.split(" ");
    
    const crmPayload = {
      firstName: firstName || data.name,
      lastName: lastName.join(" ") || "",
      name: data.name,
      emailAddress: data.email,
      phoneNumber: data.phone,
      description: data.message,
      source: "Website Contact Form",
      consentEmail: false, // Unless explicitly opted in
    };
    
    // Send to EspoCRM
    if (env.ESPOCRM_URL && env.ESPOCRM_API_KEY) {
      const crmResponse = await fetch(`${env.ESPOCRM_URL}/Lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": env.ESPOCRM_API_KEY,
        },
        body: JSON.stringify(crmPayload),
      });
      
      if (!crmResponse.ok) {
        console.error("CRM error:", await crmResponse.text());
        throw new Error("Failed to create lead");
      }
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
```

### Authenticated API Route

```typescript
import { requireAuth } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    await requireAuth();
    
    // Proceed with authenticated logic
    // ...
    
    return NextResponse.json({ data: "..." });
    
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
```

## Database Development

### Prisma Schema Patterns

```prisma
model ModelName {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Fields here
  
  @@index([fieldName])
}
```

### Database Queries

```typescript
import { db } from "@/lib/db";

// Find many
const posts = await db.blogPost.findMany({
  where: {
    published: true,
    locale: "en",
  },
  orderBy: { date: "desc" },
  select: {
    id: true,
    title: true,
    excerpt: true,
  },
});

// Find unique
const post = await db.blogPost.findUnique({
  where: { slug: "my-post" },
});

// Create
const newPost = await db.blogPost.create({
  data: {
    slug: "new-post",
    title: "New Post",
    // ...
  },
});

// Update
const updated = await db.blogPost.update({
  where: { id: "..." },
  data: { title: "Updated" },
});

// Delete
await db.blogPost.delete({
  where: { id: "..." },
});
```

## Bilingual Implementation

### URL Structure
- English: `/rooms`, `/dining`, `/contact`
- Spanish: `/es/habitaciones`, `/es/restaurante`, `/es/contacto`

### Page File Structure
```
app/
├── rooms/page.tsx              # English
├── dining/page.tsx             # English
└── es/
    ├── habitaciones/page.tsx   # Spanish (rooms)
    └── restaurante/page.tsx    # Spanish (dining)
```

### Shared Components
```tsx
// components/page-hero.tsx
interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: {
    text: string;
    href: string;
  };
}

export function PageHero({ title, subtitle, image, cta }: PageHeroProps) {
  return (
    <div className="relative h-96">
      {/* Hero implementation */}
    </div>
  );
}

// Usage in English page
<PageHero
  title="Our Rooms"
  subtitle="Eco-luxury accommodations"
  image="/images/rooms.jpg"
  cta={{ text: "Book Now", href: "/contact" }}
/>

// Usage in Spanish page
<PageHero
  title="Nuestras Habitaciones"
  subtitle="Alojamiento eco-lujoso"
  image="/images/rooms.jpg"
  cta={{ text: "Reservar Ahora", href: "/es/contacto" }}
/>
```

### Content Management
```typescript
// content/data.ts (English)
export const roomsData = {
  premium: {
    name: "Premium Deluxe Cabana",
    size: "33 m²",
    guests: 2,
    // ...
  },
};

// content/data-es.ts (Spanish)
export const roomsData = {
  premium: {
    name: "Cabaña Premium Deluxe",
    size: "33 m²",
    guests: 2,
    // ...
  },
};
```

## Testing Checklist

### Before Committing
- [ ] TypeScript compiles without errors
- [ ] ESLint shows no warnings
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile viewport
- [ ] Tested English and Spanish versions
- [ ] Forms submit successfully
- [ ] Error states display correctly
- [ ] Loading states implemented
- [ ] Responsive at all breakpoints
- [ ] Follows style guide

### Before Deploying
- [ ] All tests passing
- [ ] Database migrations prepared
- [ ] Environment variables documented
- [ ] Performance acceptable (Lighthouse)
- [ ] Accessibility checked (a11y)
- [ ] SEO meta tags present
- [ ] Analytics tracking working
- [ ] CRM integration tested
- [ ] Error monitoring configured

## Common Gotchas

### Server vs Client Components
```tsx
// ❌ Wrong - using hooks in server component
export default function Page() {
  const [state, setState] = useState(); // Error!
  return <div>...</div>;
}

// ✅ Correct - mark as client component
"use client";
export default function Page() {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

### Environment Variables
```tsx
// ❌ Wrong - accessing process.env in client
"use client";
const apiKey = process.env.ESPOCRM_API_KEY; // Undefined!

// ✅ Correct - use API route
const response = await fetch("/api/crm"); // Server handles env vars
```

### Image Optimization
```tsx
// ❌ Wrong - regular img tag
<img src="/images/hero.jpg" alt="Hero" />

// ✅ Correct - Next.js Image component
<Image
  src="/images/hero.jpg"
  alt="Hero image showing bay"
  width={1200}
  height={600}
  priority // For above-fold images
/>
```

### Link Component
```tsx
// ❌ Wrong - regular anchor
<a href="/rooms">Rooms</a>

// ✅ Correct - Next.js Link
<Link href="/rooms">Rooms</Link>
```

## Performance Optimization

### Image Guidelines
- Use WebP format when possible
- Provide width/height attributes
- Use `priority` for above-fold images
- Lazy load below-fold images
- Compress images before upload

### Bundle Size
- Import only what you need
- Use dynamic imports for large components
- Check bundle analyzer output
- Avoid unnecessary client components

### Database Queries
- Select only needed fields
- Use appropriate indexes
- Batch related queries
- Cache when appropriate

## Error Handling

### User-Facing Errors
```tsx
// Good error messages
"Unable to send message. Please try contacting us via WhatsApp."
"Email address is invalid. Please check and try again."
"This page doesn't exist. Return to homepage?"

// Bad error messages
"Error 500"
"Something went wrong"
"Network error"
```

### Logging
```typescript
// Development
console.log("Debug info", data);

// Production
try {
  // operation
} catch (error) {
  console.error("Specific context:", error);
  // Optionally send to error tracking service
}
```

---

**Remember:** Code is read more than it's written. Optimize for clarity and maintainability.

**Last updated:** November 6, 2025
