---
title: Site Component Inventory
description: Canonical list of reusable marketing components available in the Dolphin Blue Paradise Next.js application. Each entry powers the `/demo/components` showcase and should remain the single source of truth for component previews, example props, and usage notes.
---

> Update this inventory whenever a new reusable component is created or an existing component requires fresh sample content. The `components` array below is consumed directly by the demo page—keep the JSON valid.

```json
[
  {
    "id": "hero-ocean-arrival",
    "title": "Ocean Arrival Hero",
    "component": "hero",
    "description": "Immersive hero block with cinematic imagery, headline stack, and dual call-to-action buttons for conversion and exploration paths.",
    "tags": ["homepage", "immersive", "cta"],
    "content": {
      "kicker": "Eco-Luxury Retreat",
      "heading": "Paradise Between the Jungle & the Sea",
      "copy": "Welcome discerning travelers to Dolphin Blue Paradise—where handcrafted hospitality, regenerative practices, and unforgettable adventures meet.",
      "backgroundImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      "primaryCta": {
        "label": "Plan Your Escape",
        "href": "/plan-your-journey"
      },
      "secondaryCta": {
        "label": "View Our Rooms",
        "href": "/rooms"
      }
    }
  },
  {
    "id": "value-pillars",
    "title": "Value Pillars Grid",
    "component": "valuePillars",
    "description": "Four-up card grid introducing the resort's signature pillars with iconography and succinct copy.",
    "tags": ["value-prop", "overview", "grid"],
    "content": {
      "items": [
        {
          "icon": "🌿",
          "title": "Regenerative Luxury",
          "description": "From solar-powered suites to rainwater harvesting, every stay leaves the island healthier."
        },
        {
          "icon": "🐬",
          "title": "Dolphin Bay Encounters",
          "description": "Observe 80 resident bottlenose dolphins at play with ethical-wildlife certified guides."
        },
        {
          "icon": "🥘",
          "title": "Farm-to-Table Dining",
          "description": "Seasonal menus crafted with organic produce from Roque's garden and local fishers."
        },
        {
          "icon": "🤝",
          "title": "Community Partnership",
          "description": "Support Floating Doctors missions and scholarship programs with every booking."
        }
      ]
    }
  },
  {
    "id": "experience-highlights",
    "title": "Experience Highlights",
    "component": "experienceShowcase",
    "description": "Editorial card row surfacing headline experiences with imagery, duration, and vibe notes.",
    "tags": ["experiences", "carousel", "imagery"],
    "content": {
      "items": [
        {
          "title": "Dolphin Bay Sunrise Safari",
          "description": "Glide across glassy waters at dawn as pods breach alongside the boat—guided by marine biologists.",
          "meta": "3 hrs • Gentle Adventure",
          "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
        },
        {
          "title": "Ngäbe Cultural Immersion",
          "description": "Visit neighboring island communities for cacao tasting, artisan crafts, and shared storytelling.",
          "meta": "Half Day • Cultural",
          "image": "https://images.unsplash.com/photo-1529928441946-3c12a0bfb680?auto=format&fit=crop&w=1200&q=80"
        },
        {
          "title": "Rainforest Canopy Hike",
          "description": "Follow our naturalist through primary jungle in search of sloths, toucans, and medicinal flora.",
          "meta": "2.5 hrs • Active",
          "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    }
  },
  {
    "id": "impact-metrics",
    "title": "Impact Metrics Banner",
    "component": "impactMetrics",
    "description": "Bold statistic band reinforcing measurable sustainability outcomes for persuasive storytelling.",
    "tags": ["impact", "metrics", "supporting"],
    "content": {
      "heading": "Impact You Can See",
      "metrics": [
        {
          "label": "Solar Energy Generated",
          "value": "18.4 MWh",
          "helper": "Measured year-to-date across the micro-grid."
        },
        {
          "label": "Organic Produce Sourced",
          "value": "83%",
          "helper": "Grown on-site or supplied by neighboring farms."
        },
        {
          "label": "Community Clinic Visits",
          "value": "312",
          "helper": "Floating Doctors consultations funded this season."
        }
      ]
    }
  },
  {
    "id": "journey-planner",
    "title": "Journey Planner Timeline",
    "component": "journeyPlanner",
    "description": "Concise travel planning timeline guiding guests from airport arrival through island transfer.",
    "tags": ["plan-your-journey", "logistics"],
    "content": {
      "steps": [
        {
          "icon": "🛫",
          "title": "Arrive in Panama City",
          "description": "Our concierge confirms flights and arranges priority domestic transfers to Bocas."
        },
        {
          "icon": "🛥️",
          "title": "Glide Across Dolphin Bay",
          "description": "Private boat pickup from Bocas Town with chilled towels and welcome refreshments."
        },
        {
          "icon": "🏝️",
          "title": "Check Into Paradise",
          "description": "Unwind in your cabana as the team finalizes bespoke itineraries and dining preferences."
        }
      ]
    }
  },
  {
    "id": "testimonial-spotlight",
    "title": "Testimonial Spotlight",
    "component": "testimonial",
    "description": "Full-width testimonial with portrait, emphasizing guest emotion and travel motivation.",
    "tags": ["social-proof", "homepage"],
    "content": {
      "quote": "“We’ve stayed in eco-luxury retreats around the world, yet nothing compares to waking up with dolphins outside our deck and knowing our stay empowers the local community.”",
      "author": "Maya & Lucian",
      "location": "Toronto, Canada",
      "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    "id": "gallery-mosaic",
    "title": "Gallery Mosaic",
    "component": "gallery",
    "description": "Asymmetric photo mosaic showcasing water, rainforest, dining, and guest experiences.",
    "tags": ["gallery", "visual", "immersive"],
    "content": {
      "images": [
        {
          "src": "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=900&q=80",
          "alt": "Overwater deck with turquoise lagoon",
          "span": "col-span-2"
        },
        {
          "src": "https://images.unsplash.com/photo-1519821172141-b5d8f3d1dc39?auto=format&fit=crop&w=700&q=80",
          "alt": "Tropical rainforest canopy",
          "span": "col-span-1"
        },
        {
          "src": "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=700&q=80",
          "alt": "Island-inspired fine dining dish",
          "span": "col-span-1"
        },
        {
          "src": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
          "alt": "Guests cruising through mangroves at sunset",
          "span": "col-span-2"
        }
      ]
    }
  },
  {
    "id": "contact-banner",
    "title": "Contact Concierge Banner",
    "component": "contactCta",
    "description": "High-intent contact stripe pairing persuasive copy with WhatsApp and email calls to action.",
    "tags": ["cta", "conversion"],
    "content": {
      "heading": "Ready to Plan Your Journey?",
      "body": "Our concierge team will curate flights, private transfers, and bespoke excursions tailored to your pace.",
      "primary": {
        "label": "Chat on WhatsApp",
        "href": "https://wa.me/50763460605"
      },
      "secondary": {
        "label": "Email the Concierge",
        "href": "mailto:contact@dolphinblueparadise.com"
      },
      "note": "Average response time under 30 minutes."
    }
  }
]
```

---

### Maintenance Checklist

- Mirror any structural changes in the demo page handling logic (`/apps/web/src/app/demo/components`).
- Host remote images on approved CDNs or add domains to `next.config.ts` if optimization is enabled.
- Capture new design intent (tags, descriptions) so strategy and design teams stay aligned.
