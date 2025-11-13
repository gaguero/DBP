# DBP Website Components List
## Complete Component Architecture Based on Site Structure Guide

This document defines all components needed to build the Dolphin Blue Paradise website based on the Complete Site Structure & Strategy Guide. Components are organized by page/section with best practices and implementation details.

**⚠️ IMPORTANT: All components MUST follow the DBP Design System defined in `STYLEGUIDE.md` and use CSS variables from `globals.css`.**

## Design System Reference

### CSS Variables (Use in Tailwind classes)
```css
--color-ocean: #0e8ba8      /* Primary Ocean - CTAs, links */
--color-navy: #1b2330       /* Deep Navy - Headers, text */
--color-sand: #f5ede3       /* Warm Sand - Backgrounds */
--color-gold: #C7A46B       /* Golden Accent - Hovers, dividers */
--color-coral: #d8684b      /* Coral Highlight - Secondary CTAs */
--color-cloud: #ffffff      /* Cloud White - Cards, backgrounds */
--color-forest: #3e5c4a     /* Forest Canopy - Sustainability */
--color-text-primary: #1b2330
--color-text-muted: #536176
--color-background: #fdfcf9
--shadow-soft: 0 16px 40px rgba(27, 35, 48, 0.08)
--radius-md: 0.5rem (4px)
```

### Typography
- **Display/Headings:** `font-display` (Playfair Display), weight 600
- **Body Text:** `font-sans` (Source Sans Pro), weight 400
- **Button Text:** Uppercase, weight 600, letter-spacing 0.08em

### Spacing Scale
- Use Tailwind spacing: 4, 8, 16, 24, 32, 48, 72px
- Section padding: `clamp(3rem, 6vw, 6rem)` (responsive)
- Container: `width: min(1120px, 100%)`, padding: `clamp(1.5rem, 5vw, 5rem)`

### Breakpoints
- Mobile: < 576px
- Tablet: 576px - 767px
- Desktop: 768px - 991px
- Large: 992px - 1199px
- XL: ≥ 1200px

### Component Patterns
- Use `clsx` for className composition
- Accept `className` prop for customization
- Use Tailwind classes with CSS variables: `bg-[var(--color-sand)]`
- Use existing utility classes: `.container`, `.section`, `.card`, `.button-primary`

---

## Table of Contents
1. [Shared/Common Components](#shared-common-components)
2. [HOME Page Components](#home-page-components)
3. [OUR STORY Page Components](#our-story-page-components)
4. [ACCOMMODATIONS Page Components](#accommodations-page-components)
5. [DINING Page Components](#dining-page-components)
6. [EXPERIENCES Page Components](#experiences-page-components)
7. [SUSTAINABILITY Page Components](#sustainability-page-components)
8. [BLOG Page Components](#blog-page-components)
9. [CONTACT / RESERVATIONS Page Components](#contact--reservations-page-components)
10. [Utility Components](#utility-components)

---

## Shared/Common Components

### Navigation & Layout
1. **`SiteHeader`** ✅ (exists)
   - Logo, main navigation, language toggle
   - Mobile hamburger menu
   - Sticky on scroll

2. **`SiteFooter`** ✅ (exists)
   - Multi-column links
   - Contact info
   - Social media links
   - Newsletter signup

3. **`BreadcrumbNavigation`**
   - Shows current page location
   - Links to parent pages
   - Mobile-friendly

4. **`LanguageToggle`**
   - English/Spanish switcher
   - Maintains current page context

### Content Blocks
5. **`PageHero`** ✅ (exists)
   - Full-width image/video background
   - Overlay headline and subheading
   - CTA buttons
   - Responsive image handling

6. **`Section`**
   - Consistent section wrapper
   - Background color variants
   - Container max-width
   - Padding system

7. **`Container`**
   - Max-width wrapper
   - Responsive padding
   - Centered content

### Interactive Elements
8. **`Button`** ✅ (exists)
   - Primary/secondary variants
   - Link/button modes
   - Tracking support

9. **`Card`** ✅ (exists)
   - Base card component
   - Hover effects
   - Padding variants

10. **`Link`**
    - Styled link component
    - Internal/external handling
    - Tracking support

---

## HOME Page Components

### Hero Section
11. **`HomeHero`**
    - **Props:**
      ```typescript
      {
        title: string;
        subtitle: string;
        backgroundImage: string;
        backgroundVideo?: string;
        ctaPrimary: { label: string; href: string };
        ctaSecondary: { label: string; href: string };
        className?: string;
      }
      ```
    - **Features:**
      - Full-width image/video with overlay
      - Gradient overlay: `bg-gradient-to-b from-black/55 via-black/45 to-black/70`
      - Dual CTAs using `Button` component (primary/secondary variants)
      - Responsive: stacked on mobile
      - Lazy loading for performance
    - **Styling:**
      ```tsx
      // Use PageHero pattern with custom overlay
      <section className="relative isolate overflow-hidden">
        <Image src={backgroundImage} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        <div className="relative container flex min-h-[60vh] flex-col justify-center gap-6 py-24 text-white">
          <h1 className="max-w-3xl font-display text-4xl md:text-6xl">{title}</h1>
          <p className="max-w-2xl text-lg text-white/80">{subtitle}</p>
          <div className="flex gap-4">
            <Button href={ctaPrimary.href} variant="primary">{ctaPrimary.label}</Button>
            <Button href={ctaSecondary.href} variant="secondary">{ctaSecondary.label}</Button>
          </div>
        </div>
      </section>
      ```
    - **Best Practices:**
      - Use Next.js `Image` component with `fill` and `priority`
      - Image optimization (WebP, responsive sizes)
      - Video autoplay with muted attribute
      - Accessible alt text
      - Fast loading (< 3 seconds)

### Value Pillars
12. **`ValuePillarCard`**
    - **Props:**
      ```typescript
      {
        icon: ReactNode;
        title: string;
        description: string;
        href?: string;
        className?: string;
      }
      ```
    - **Features:**
      - Icon above title (24-32px bounding box, ~1.75px stroke)
      - Golden accent rule/divider: `border-t-2 border-[var(--color-gold)]`
      - Hover lift animation: `hover:translateY(-6px)`
      - Shadow intensifies on hover: `hover:shadow-[0_12px_32px_rgba(27,35,48,0.16)]`
      - Icon fill shifts to Primary Ocean on hover
      - Optional link wrapper
    - **Styling:**
      ```tsx
      <Card className="text-center space-y-4 p-6">
        <div className="flex justify-center mb-4">
          {icon} {/* Icon in var(--color-gold), shifts to var(--color-ocean) on hover */}
        </div>
        <div className="border-t-2 border-[var(--color-gold)] pt-4">
          <h3 className="font-display text-xl text-[var(--color-navy)] mb-2">{title}</h3>
          <p className="text-base text-[var(--color-text-primary)] leading-relaxed">{description}</p>
        </div>
      </Card>
      ```
    - **Layout:** 4-card grid (1 col mobile, 2 tablet, 4 desktop)
      ```tsx
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* ValuePillarCard components */}
      </div>
      ```

13. **`ValuePillarsGrid`**
    - Wrapper for 4 ValuePillarCard components
    - Responsive grid layout
    - Consistent spacing

### About Preview
14. **`AboutPreview`**
    - **Props:**
      ```typescript
      {
        title: string;
        description: string;
        image: string;
        cta: { label: string; href: string };
      }
      ```
    - **Features:**
      - Split layout (image left, text right)
      - Warm Sand card overlay
      - "Our Story →" CTA
      - Responsive: stacked on mobile

### Accommodations Preview
15. **`RoomPreviewCard`**
    - **Props:**
      ```typescript
      {
        name: string;
        image: string;
        highlights: string[];
        startingRate?: string;
        href: string;
        className?: string;
      }
      ```
    - **Features:**
      - Thumbnail image with hover zoom: `group-hover:scale-110 transition-transform duration-500`
      - Key features list with checkmarks
      - Starting rate display in `var(--color-gold)`
      - "View Details" button using `Button` component
      - Card hover effects: `hover:translateY(-6px)`
    - **Styling:**
      ```tsx
      <Card className="group overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl text-[var(--color-navy)] mb-2">{name}</h3>
          <ul className="space-y-2 mb-4">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                <span className="text-[var(--color-gold)] mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {startingRate && (
            <p className="text-[var(--color-gold)] font-semibold mb-4">From {startingRate}</p>
          )}
          <Button href={href} variant="secondary" className="w-full">View Details</Button>
        </div>
      </Card>
      ```

16. **`AccommodationsPreview`**
    - Grid of 4 RoomPreviewCard components
    - Section title and intro
    - "Discover Our Rooms →" CTA
    - Responsive: 1 col mobile, 2 tablet, 4 desktop

### Experiences Carousel
17. **`ExperienceCarouselCard`**
    - **Props:**
      ```typescript
      {
        title: string;
        image: string;
        duration: string;
        intensity: string;
        season?: string;
        href: string;
        className?: string;
      }
      ```
    - **Features:**
      - Image with overlay gradient: `bg-gradient-to-t from-black/70 via-black/40 to-transparent`
      - Title overlay in white text
      - Quick stats badge overlay
      - Clickable card with Link wrapper
    - **Styling:**
      ```tsx
      <Link href={href} className="group relative block h-96 overflow-hidden rounded">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-display text-2xl mb-2">{title}</h3>
          <div className="flex gap-4 text-sm">
            <span>{duration}</span>
            <span>•</span>
            <span>{intensity}</span>
            {season && <span>•</span>}
            {season && <span>{season}</span>}
          </div>
        </div>
      </Link>
      ```

18. **`ExperiencesCarousel`**
    - **Features:**
      - Swipeable carousel (mobile) - use library like Swiper or Embla
      - Navigation arrows styled with `var(--color-ocean)`
      - Dot indicators
      - Auto-play option
      - Keyboard navigation
      - "Explore All Experiences →" CTA using `Button` component
    - **Styling:**
      ```tsx
      <section className="section">
        <div className="container">
          {/* Carousel implementation */}
          <div className="mt-8 text-center">
            <Button href="/experiences" variant="primary">Explore All Experiences →</Button>
          </div>
        </div>
      </section>
      ```
    - **Best Practices:**
      - Touch/swipe support
      - Accessible controls with ARIA labels
      - Lazy load images with Next.js Image
      - Smooth transitions: `transition-transform duration-300`

### Dining Feature
19. **`DiningFeatureHero`**
    - Full-width hero image
    - Section title overlay
    - Intro paragraph

20. **`DiningPhotoGrid`**
    - **Props:**
      ```typescript
      {
        images: Array<{
          src: string;
          alt: string;
          caption?: string;
        }>;
      }
      ```
    - **Features:**
      - 4-image grid layout
      - Lightbox on click
      - Responsive: 2x2 grid
      - Hover effects

21. **`ChefQuote`**
    - Featured quote display
    - Chef name attribution
    - Styled quote marks
    - Golden accent background option

22. **`DiningHighlights`**
    - **Props:**
      ```typescript
      {
        highlights: Array<{
          icon?: string;
          text: string;
        }>;
      }
      ```
    - **Features:**
      - Checkmark list
      - Icon support
      - Responsive columns

### Sustainability Highlight
23. **`StatsBlock`**
    - **Props:**
      ```typescript
      {
        stats: Array<{
          value: string;
          label: string;
        }>;
        separator?: string;
        className?: string;
      }
      ```
    - **Features:**
      - Horizontal stat display
      - Separator (e.g., "|") in `var(--color-text-muted)`
      - Responsive: stacked on mobile, horizontal on desktop
      - Large, bold numbers in `var(--color-navy)`
    - **Styling:**
      ```tsx
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <>
            <div key={idx} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                {stat.label}
              </div>
            </div>
            {idx < stats.length - 1 && separator && (
              <span className="text-[var(--color-text-muted)] hidden md:inline">{separator}</span>
            )}
          </>
        ))}
      </div>
      ```

24. **`SustainabilityHighlight`**
    - StatsBlock component
    - Brief description paragraph in `var(--color-text-primary)`
    - "Our Impact →" CTA using `Button` component
    - Background: `bg-[var(--color-sand)]` optional

### Testimonials
25. **`TestimonialCard`**
    - **Props:**
      ```typescript
      {
        quote: string;
        author: string;
        authorImage?: string;
        rating: number;
        source: 'Google' | 'Booking.com' | 'TripAdvisor';
        sourceBadge?: string;
        category?: 'accommodations' | 'dining' | 'experiences' | 'sustainability';
        className?: string;
      }
      ```
    - **Features:**
      - Quote text in italic, `text-lg`
      - Author name and photo
      - Star rating display using `var(--color-gold)` for stars
      - Source badge/logo
      - Category tag (optional)
      - Card styling with `Card` component
    - **Styling:**
      ```tsx
      <Card className="p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "text-[var(--color-gold)]" : "text-gray-300"}>
              ★
            </span>
          ))}
          {sourceBadge && <Image src={sourceBadge} alt={source} width={80} height={20} />}
        </div>
        <blockquote className="text-lg italic text-[var(--color-text-primary)] leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-sand)]">
          {authorImage && (
            <Image src={authorImage} alt={author} width={48} height={48} className="rounded-full" />
          )}
          <div>
            <p className="font-semibold text-[var(--color-navy)]">{author}</p>
            {category && (
              <p className="text-sm text-[var(--color-text-muted)] capitalize">{category}</p>
            )}
          </div>
        </div>
      </Card>
      ```

26. **`TestimonialsSlider`**
    - **Features:**
      - Swipeable slider
      - Navigation arrows
      - Dot indicators
      - Auto-advance option
      - Mix of testimonial categories
      - Responsive: 1 card mobile, 2-3 desktop

### Blog Preview
27. **`BlogPostCard`**
    - **Props:**
      ```typescript
      {
        title: string;
        excerpt: string;
        image: string;
        date: string;
        category: string;
        href: string;
      }
      ```
    - **Features:**
      - Featured image
      - Title and excerpt
      - Category badge
      - Date display
      - Hover effects

28. **`BlogPreview`**
    - Grid of 3 BlogPostCard components
    - Section title
    - "Read More Stories →" CTA
    - Responsive: 1 col mobile, 3 desktop

### CTA Footer Strip
29. **`CTABanner`**
    - **Props:**
      ```typescript
      {
        title: string;
        description?: string;
        ctaPrimary: { label: string; href: string };
        ctaSecondary?: { label: string; href: string };
        background?: 'ocean' | 'navy' | 'gold';
        className?: string;
      }
      ```
    - **Features:**
      - Full-width banner
      - Dual CTA support using `Button` component
      - Background color variants using CSS variables
      - Responsive padding: `py-12 md:py-16`
      - High contrast for visibility
    - **Styling:**
      ```tsx
      <section className={`section ${
        background === 'ocean' ? 'bg-[var(--color-ocean)]' :
        background === 'navy' ? 'bg-[var(--color-navy)]' :
        background === 'gold' ? 'bg-[var(--color-gold)]' :
        'bg-[var(--color-navy)]'
      } text-white`}>
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
          {description && <p className="text-lg text-white/90 max-w-2xl mx-auto">{description}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ctaPrimary.href} variant="primary" className="bg-white text-[var(--color-navy)] hover:bg-[var(--color-sand)]">
              {ctaPrimary.label}
            </Button>
            {ctaSecondary && (
              <Button href={ctaSecondary.href} variant="secondary" className="border-white text-white hover:bg-white/10">
                {ctaSecondary.label}
              </Button>
            )}
          </div>
        </div>
      </section>
      ```

---

## OUR STORY Page Components

### Story Section
30. **`StorySection`**
    - **Props:**
      ```typescript
      {
        title: string;
        content: string;
        image?: string;
        imagePosition?: 'left' | 'right';
      }
      ```
    - **Features:**
      - Split layout with image
      - Rich text content
      - Responsive: stacked on mobile

### Team Section
31. **`TeamMemberCard`**
    - **Props:**
      ```typescript
      {
        name: string;
        title: string;
        image: string;
        bio: string;
        quote?: string;
      }
      ```
    - **Features:**
      - Profile image
      - Name and title
      - Bio text
      - Optional quote
      - Card layout

32. **`TeamGrid`**
    - Grid of TeamMemberCard components
    - Section title
    - Responsive: 1 col mobile, 2-3 desktop

### Press & Recognition
33. **`RecognitionLogo`**
    - **Props:**
      ```typescript
      {
        logo: string;
        alt: string;
        href?: string;
      }
      ```
    - **Features:**
      - Logo image
      - Optional link
      - Grayscale with color on hover
      - Consistent sizing

34. **`RecognitionGrid`**
    - Grid of RecognitionLogo components
    - Section title
    - Horizontal scroll on mobile

### Promise Pillars
35. **`PromisePillar`**
    - **Props:**
      ```typescript
      {
        title: string;
        description: string;
        icon?: ReactNode;
      }
      ```
    - **Features:**
      - Icon support
      - Title and description
      - Card layout
      - 3-column grid

### Partners Section
36. **`PartnerCard`**
    - **Props:**
      ```typescript
      {
        name: string;
        type: 'NGO' | 'Farm' | 'Cooperative';
        description: string;
        logo?: string;
        website?: string;
      }
      ```
    - **Features:**
      - Partner info
      - Type badge
      - Optional logo
      - Link to website

37. **`PartnersGrid`**
    - Grid of PartnerCard components
    - Grouped by type
    - Section title

---

## ACCOMMODATIONS Page Components

### Room Comparison
38. **`RoomCard`** ✅ (exists, may need enhancement)
    - **Props:**
      ```typescript
      {
        name: string;
        slug: string;
        heroImage: string;
        size: string;
        capacity: string;
        description: string;
        highlights: string[];
        amenities: string[];
        startingRate?: string;
        gallery?: string[];
      }
      ```
    - **Features:**
      - Hero image with hover zoom
      - Room name and key stats
      - Highlights list
      - Amenities preview (first 4)
      - "Book Your Room" CTA
      - Link to detail page

39. **`RoomComparisonGrid`**
    - Grid of 4 RoomCard components
    - Side-by-side comparison
    - Responsive: 1 col mobile, 2 desktop

### Room Detail Page
40. **`RoomImageGallery`**
    - **Props:**
      ```typescript
      {
        images: string[];
        roomName: string;
      }
      ```
    - **Features:**
      - Main image display
      - Thumbnail strip
      - Lightbox on click
      - 360° tour button (if available)
      - Image counter
      - Keyboard navigation

41. **`RoomOverview`**
    - **Props:**
      ```typescript
      {
        description: string;
        occupancy: string;
        size: string;
        bedConfiguration: string;
        uniquePerks: string[];
      }
      ```
    - **Features:**
      - Rich text description
      - Key details grid
      - Unique perks list

42. **`AmenitiesList`**
    - **Props:**
      ```typescript
      {
        amenities: Array<{
          category: 'Comfort' | 'Technology' | 'Sustainability';
          items: string[];
        }>;
      }
      ```
    - **Features:**
      - Grouped by category
      - Icon support
      - Checkmark list
      - Expandable sections

43. **`RoomTestimonial`**
    - Tailored testimonial for specific room
    - Guest name and photo
    - Room-specific quote

44. **`FloorPlan`** (Optional)
    - **Props:**
      ```typescript
      {
        image: string;
        alt: string;
        dimensions?: string;
      }
      ```
    - **Features:**
      - Floor plan image
      - Zoom functionality
      - Dimension labels

### Packages Section
45. **`PackageCard`**
    - **Props:**
      ```typescript
      {
        name: string;
        description: string;
        image: string;
        itinerary: string[];
        includes: string[];
        excludes?: string[];
        bestSeason: string;
        href: string;
      }
      ```
    - **Features:**
      - Hero image
      - Package name and description
      - Day-by-day itinerary
      - Included/excluded items
      - Best season indicator
      - "Request Custom Quote" CTA

46. **`PackagesSection`**
    - Grid of PackageCard components
    - Section title
    - Integrated into Accommodations page

### Inclusions List
47. **`InclusionsList`**
    - **Props:**
      ```typescript
      {
        inclusions: string[];
        title?: string;
      }
      ```
    - **Features:**
      - Checkmark list
      - Common inclusions display
      - Styled box

---

## DINING Page Components

### Chef Story
48. **`ChefStory`**
    - **Props:**
      ```typescript
      {
        chefName: string;
        title: string;
        image: string;
        story: string;
        philosophy: string;
      }
      ```
    - **Features:**
      - Chef photo and bio
      - Philosophy section
      - Split layout with image

### Meal Schedule
49. **`MealScheduleCard`**
    - **Props:**
      ```typescript
      {
        meal: 'Breakfast' | 'Lunch' | 'Dinner';
        time: string;
        description: string;
      }
      ```
    - **Features:**
      - Meal name and time
      - Description
      - Card layout

50. **`MealSchedule`**
    - Grid of MealScheduleCard components
    - Section title
    - Responsive layout

### Menu Preview
51. **`MenuDishCard`**
    - **Props:**
      ```typescript
      {
        name: string;
        image: string;
        description?: string;
        tags?: ('vegan' | 'gluten-free' | 'vegetarian')[];
        price?: string;
      }
      ```
    - **Features:**
      - Dish image
      - Name and description
      - Dietary tags
      - Optional price
      - Hover effects

52. **`MenuCarousel`**
    - Carousel of MenuDishCard components
    - Navigation arrows
    - "View Full Menu (PDF)" link

### Dining Testimonials
53. **`DiningTestimonial`**
    - Specialized testimonial for dining
    - Food-focused quotes
    - Reuses TestimonialCard with category filter

### Reservations Info
54. **`ReservationsInfo`**
    - **Props:**
      ```typescript
      {
        noticeRequired: string;
        nonGuestPolicy: string;
        contactMethods: Array<{
          type: 'WhatsApp' | 'Email';
          value: string;
        }>;
      }
      ```
    - **Features:**
      - Policy information
      - Contact method buttons
      - Styled info box

---

## EXPERIENCES Page Components

### Activities Hub
55. **`ActivityCategoryCard`**
    - **Props:**
      ```typescript
      {
        category: string;
        description: string;
        image: string;
        activityCount: number;
        href: string;
      }
      ```
    - **Features:**
      - Category image
      - Name and description
      - Activity count
      - Link to category page

56. **`ActivitiesHub`**
    - Grid of ActivityCategoryCard components
    - Overview text
    - "Request Custom Itinerary" CTA

### Activity Detail Page
57. **`ActivityHero`**
    - Full-width hero image/video
    - Activity title
    - Quick stats overlay

58. **`ActivityStats`**
    - **Props:**
      ```typescript
      {
        duration: string;
        difficulty: 'Easy' | 'Moderate' | 'Challenging';
        suitableFor: string[];
        season?: string;
      }
      ```
    - **Features:**
      - Icon-based stats
      - Difficulty indicator
      - Suitable for badges
      - Season indicator

59. **`ItineraryTimeline`**
    - **Props:**
      ```typescript
      {
        steps: Array<{
          time?: string;
          title: string;
          description: string;
        }>;
      }
      ```
    - **Features:**
      - Timeline layout
      - Step-by-step breakdown
      - Visual timeline line
      - Responsive: vertical on mobile

60. **`InclusionsBox`**
    - **Props:**
      ```typescript
      {
        included: string[];
        notIncluded?: string[];
      }
      ```
    - **Features:**
      - Checkmark list for included
      - X list for not included
      - Clear visual distinction

61. **`SustainabilityFootprint`**
    - Tips for minimal impact
    - Eco-friendly practices
    - Styled info box

62. **`BookingInfo`**
    - **Props:**
      ```typescript
      {
        howToReserve: string;
        noticeRequired: string;
        pricingGuidelines?: string;
      }
      ```
    - **Features:**
      - Booking instructions
      - Notice requirements
      - Pricing info
      - "Add to Your Itinerary" CTA

63. **`WildlifeSpecies`**
    - **Props:**
      ```typescript
      {
        species: Array<{
          name: string;
          image?: string;
          description?: string;
        }>;
      }
      ```
    - **Features:**
      - Species list with images
      - Descriptions
      - Grid layout

---

## SUSTAINABILITY Page Components

### Infrastructure Section
64. **`InfrastructureCard`**
    - **Props:**
      ```typescript
      {
        title: string;
        description: string;
        metrics?: Array<{
          label: string;
          value: string;
        }>;
        image?: string;
      }
      ```
    - **Features:**
      - System description
      - Key metrics display
      - Optional image
      - Card layout

### Food Cycle
65. **`FoodCycleVisualization`**
    - Visual representation of farm-to-table cycle
    - Step-by-step process
    - Icon-based flow

66. **`SourcingPartnerCard`**
    - Partner information
    - Location
    - Partnership details

### Community Programs
67. **`ProgramCard`**
    - **Props:**
      ```typescript
      {
        title: string;
        description: string;
        impact: string;
        image?: string;
        partner?: string;
      }
      ```
    - **Features:**
      - Program details
      - Impact metrics
      - Partner attribution
      - Card layout

### Biodiversity
68. **`BiodiversitySection`**
    - Monitoring programs
    - Protection initiatives
    - Visual stats
    - Image gallery

### Impact Metrics
69. **`ImpactMetricCard`**
    - **Props:**
      ```typescript
      {
        metric: string;
        value: string;
        description: string;
        icon?: ReactNode;
      }
      ```
    - **Features:**
      - Large metric value
      - Description
      - Icon support
      - Animated counter (optional)

70. **`ImpactMetricsGrid`**
    - Grid of ImpactMetricCard components
    - Section title
    - "Download Full Report" CTA

---

## BLOG Page Components

### Blog Listing
71. **`BlogPostPreview`**
    - **Props:**
      ```typescript
      {
        title: string;
        excerpt: string;
        image: string;
        date: string;
        author: string;
        category: string;
        slug: string;
        featured?: boolean;
      }
      ```
    - **Features:**
      - Featured image
      - Title and excerpt
      - Metadata (date, author, category)
      - Category badge
      - Read more link
      - Featured variant (larger)

72. **`BlogGrid`**
    - Grid of BlogPostPreview components
    - Featured post (hero size)
    - Recent posts grid
    - Pagination

### Blog Filters
73. **`BlogCategoryFilter`**
    - **Props:**
      ```typescript
      {
        categories: string[];
        activeCategory?: string;
        onCategoryChange: (category: string) => void;
      }
      ```
    - **Features:**
      - Category buttons
      - Active state
      - Sidebar or top bar layout

### Blog Post Detail
74. **`BlogPostHeader`**
    - Hero image
    - Title
    - Metadata (author, date, category)
    - Reading time estimate

75. **`BlogPostContent`**
    - Rich text content
    - Image galleries
    - Pull quotes
    - Internal links

76. **`RelatedPosts`**
    - Grid of related blog posts
    - Section title
    - 3-4 related posts

77. **`ShareButtons`**
    - Social sharing buttons
    - Copy link functionality
    - Print option

---

## CONTACT / RESERVATIONS Page Components

### Contact Methods
78. **`ContactMethodCard`**
    - **Props:**
      ```typescript
      {
        type: 'WhatsApp' | 'Email' | 'Phone';
        value: string;
        label: string;
        icon: ReactNode;
        action: () => void;
      }
      ```
    - **Features:**
      - Icon and label
      - Clickable action
      - Styled card
      - Direct link/action

79. **`ContactMethodsGrid`**
    - Grid of ContactMethodCard components
    - Section title
    - Responsive layout

### Booking Widget
80. **`BookingWidget`**
    - **Props:**
      ```typescript
      {
        provider: 'Cloudbeds' | 'Custom';
        embedCode?: string;
        apiKey?: string;
      }
      ```
    - **Features:**
      - Embedded booking widget
      - Date picker
      - Room selection
      - Real-time availability
      - Responsive iframe

### Contact Form
81. **`ContactForm`**
    - **Props:**
      ```typescript
      {
        fields: FormField[];
        onSubmit: (data: FormData) => void;
        showTravelDates?: boolean;
        showPartySize?: boolean;
        showInterests?: boolean;
      }
      ```
    - **Features:**
      - Name, email, message
      - Optional: travel dates, party size, interests
      - Validation
      - Submit button
      - Success/error states

### Getting Here
82. **`TravelMap`**
    - **Props:**
      ```typescript
      {
        route: Array<{
          location: string;
          coordinates: [number, number];
          description?: string;
        }>;
      }
      ```
    - **Features:**
      - Interactive map
      - Route visualization
      - Location markers
      - Step indicators

83. **`TravelStep`**
    - **Props:**
      ```typescript
      {
        step: number;
        title: string;
        description: string;
        icon?: ReactNode;
      }
      ```
    - **Features:**
      - Step number
      - Title and description
      - Icon support
      - Timeline layout

84. **`PackingList`**
    - **Props:**
      ```typescript
      {
        items: Array<{
          category: string;
          items: string[];
        }>;
        season?: string;
      }
      ```
    - **Features:**
      - Categorized list
      - Checkbox format
      - Season-specific items
      - Printable option

85. **`TravelFactsheet`**
    - Downloadable PDF link
    - Summary of travel info
    - CTA button

### FAQs
86. **`FAQAccordion`**
    - **Props:**
      ```typescript
      {
        faqs: Array<{
          question: string;
          answer: string;
          category?: string;
        }>;
        grouped?: boolean;
      }
      ```
    - **Features:**
      - Expandable/collapsible items
      - Category grouping
      - Search functionality
      - Schema markup support
      - Keyboard navigation

87. **`FAQCategory`**
    - Groups FAQs by category
    - Category tabs
    - Filter functionality

---

## Utility Components

### Media Components
88. **`ImageGallery`**
    - Lightbox functionality
    - Thumbnail navigation
    - Full-screen mode
    - Keyboard navigation
    - Image counter

89. **`VideoPlayer`**
    - Custom video player
    - Controls
    - Autoplay option
    - Responsive sizing

90. **`360Tour`**
    - 360° image viewer
    - Navigation controls
    - Full-screen mode
    - Mobile support

### Interactive Elements
91. **`Accordion`**
    - Expandable/collapsible content
    - Multiple or single open
    - Smooth animations
    - Accessible

92. **`Tabs`**
    - Tab navigation
    - Content switching
    - Accessible
    - Keyboard navigation

93. **`Modal`**
    - Overlay modal
    - Close button
    - Focus trap
    - Backdrop click to close
    - Escape key to close

94. **`Tooltip`**
    - Hover tooltip
    - Position variants
    - Accessible

### Form Components
95. **`Input`**
    - Text input
    - Validation states
    - Error messages
    - Label support

96. **`Textarea`**
    - Multi-line input
    - Character counter
    - Validation

97. **`Select`**
    - Dropdown select
    - Searchable option
    - Multi-select option

98. **`Checkbox`**
    - Checkbox input
    - Label support
    - Indeterminate state

99. **`Radio`**
    - Radio button
    - Group support
    - Label support

100. **`DatePicker`**
    - Date selection
    - Range selection
    - Min/max dates
    - Calendar view

### Feedback Components
101. **`Alert`**
    - Success/error/warning/info variants
    - Dismissible
    - Icon support

102. **`LoadingSpinner`**
    - Loading indicator
    - Size variants
    - Full-page overlay option

103. **`ProgressBar`**
    - Progress indicator
    - Percentage display
    - Animated

### SEO & Analytics
104. **`StructuredData`**
    - JSON-LD schema markup
    - Page-specific schemas
    - Dynamic data injection

105. **`MetaTags`**
    - Dynamic meta tags
    - Open Graph tags
    - Twitter cards
    - SEO optimization

---

## Component Implementation Priority

### Phase 1: Core Foundation (Week 1-2)
- Shared components (Header, Footer, Button, Card, PageHero)
- HOME page core components (Hero, ValuePillars, CTA Banner)
- Basic layout components (Section, Container)

### Phase 2: Key Pages (Week 3-4)
- ACCOMMODATIONS page (RoomCard, RoomComparisonGrid, RoomDetail)
- DINING page (MealSchedule, MenuCarousel, ReservationsInfo)
- CONTACT page (ContactForm, BookingWidget, FAQs)

### Phase 3: Content Pages (Week 5-6)
- EXPERIENCES page (ActivityCard, ActivityDetail)
- SUSTAINABILITY page (ImpactMetrics, InfrastructureCard)
- OUR STORY page (TeamCard, StorySection)

### Phase 4: Enhanced Features (Week 7-8)
- BLOG components
- Advanced media (360Tour, VideoPlayer, ImageGallery)
- Interactive elements (Carousel, Accordion, Modal)
- Form enhancements

### Phase 5: Polish & Optimization (Week 9-10)
- Performance optimization
- Accessibility improvements
- Mobile refinements
- Testing and bug fixes

---

## Best Practices Summary

### Styling Guidelines (CRITICAL)
- **Always use CSS variables** for colors: `bg-[var(--color-ocean)]`, `text-[var(--color-navy)]`
- **Use existing utility classes**: `.container`, `.section`, `.card`, `.button-primary`, `.button-secondary`
- **Typography**: Use `font-display` for headings, `font-sans` for body text
- **Spacing**: Use Tailwind spacing scale (4, 8, 16, 24, 32, 48, 72px)
- **Border radius**: Use `rounded` (4px) or `--radius-md` for cards/buttons
- **Shadows**: Use `shadow-soft` class or `var(--shadow-soft)` for cards
- **Transitions**: Use `transition-[property] duration-200 ease` for hover effects
- **Responsive**: Mobile-first with Tailwind breakpoints (sm, md, lg, xl)

### Performance
- Lazy load images and videos using Next.js `Image` component
- Use WebP format with fallbacks
- Implement code splitting
- Optimize bundle size
- Use `priority` prop for above-the-fold images

### Accessibility
- Semantic HTML (`<section>`, `<article>`, `<nav>`, etc.)
- ARIA labels where needed (`aria-label`, `aria-expanded`, etc.)
- Keyboard navigation support
- Focus management with `focus-visible` states
- Screen reader support
- Color contrast compliance (4.5:1 for body, 3:1 for large text)
- Use `.sr-only` class for screen-reader-only text

### Responsive Design
- Mobile-first approach
- Breakpoints: 576px (sm), 768px (md), 992px (lg), 1200px (xl)
- Touch-friendly targets (≥48px height)
- Flexible layouts with CSS Grid and Flexbox
- Responsive typography using `clamp()` or Tailwind responsive classes
- Container max-width: `min(1120px, 100%)`

### SEO
- Semantic HTML structure
- Schema markup (JSON-LD)
- Meta tags (use Next.js `metadata` API)
- Internal linking
- Image alt text (descriptive, location/activity specific)
- Fast loading times (< 3 seconds)

### User Experience
- Clear CTAs using `Button` component
- Consistent navigation
- Loading states with `LoadingSpinner`
- Error handling with `Alert` component
- Smooth animations: `transition-transform duration-200 ease`
- Intuitive interactions
- Hover effects: `hover:translateY(-6px)` for cards, `hover:scale-110` for images

---

## Component Naming Convention

- Use PascalCase for component names
- Use descriptive, specific names
- Group related components in folders
- Use index files for exports
- Follow existing patterns in codebase

### Example Structure
```
components/
  accommodations/
    room-card.tsx
    room-comparison-grid.tsx
    room-detail.tsx
  dining/
    meal-schedule.tsx
    menu-carousel.tsx
  shared/
    button.tsx
    card.tsx
    page-hero.tsx
```

### Component Template
```tsx
import type { ReactNode } from "react";
import clsx from "clsx";
import { Card } from "@/components/card";
import { Button } from "@/components/button";

interface ComponentNameProps {
  // Props here
  className?: string;
  children?: ReactNode;
}

export function ComponentName({ 
  // Destructure props
  className 
}: ComponentNameProps) {
  return (
    <div className={clsx("base-classes", className)}>
      {/* Component content */}
    </div>
  );
}
```

### Styling Pattern
```tsx
// ✅ CORRECT - Use CSS variables
<div className="bg-[var(--color-sand)] text-[var(--color-navy)]">
  <h2 className="font-display text-3xl">Heading</h2>
  <p className="text-[var(--color-text-primary)]">Body text</p>
</div>

// ❌ WRONG - Don't use hardcoded colors
<div className="bg-[#F5EDE3] text-[#1B2330]">
  <h2 className="text-3xl">Heading</h2>
</div>

// ✅ CORRECT - Use existing utility classes
<section className="section">
  <div className="container">
    <Card className="p-6">
      <Button href="/link" variant="primary">Click</Button>
    </Card>
  </div>
</section>
```

---

## Next Steps

1. Review and approve component list
2. Create component specifications (detailed props, styling)
3. Set up component library structure
4. Begin Phase 1 implementation
5. Establish component documentation
6. Create Storybook (optional but recommended)
7. Implement testing strategy

