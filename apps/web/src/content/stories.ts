export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
  category: string;
  readingTime: string;
  content: string[];
};

export const stories: Story[] = [
  {
    slug: "chef-garden-menu",
    title: "Seasonal Menu: Garden Harvest to Table",
    excerpt: "Chef Yu shares how the tropical garden inspires each course at Blo Bar.",
    date: "Jan 8, 2025",
    image: "/images/dining-overwater.jpg",
    author: "Chef Yu",
    category: "Dining",
    readingTime: "5 min read",
    content: [
      "Every morning begins in the garden. Our team walks the terraces with wicker baskets, noting which fruits and herbs reached peak ripeness overnight.",
      "By midday the prep kitchen hums with slicing mango, fermenting cacao nibs, and simmering coconut broth. We rotate set menus weekly to celebrate what the island offers.",
      "Guests with specific dietary needs receive a call from our concierge before arrival. That conversation guides plant-based broths, gluten-free pastries, and bespoke tasting flights.",
      "We close the evening service with a table-side story about each ingredient. It keeps the menu rooted in place and invites guests to explore the garden with Roque the next day.",
    ],
  },
  {
    slug: "floating-doctors-collaboration",
    title: "Expanding Access with Floating Doctors",
    excerpt: "Volunteers recap a week of mobile clinics and how guests can support ongoing work.",
    date: "Dec 20, 2024",
    image: "/images/rooms-view.jpg",
    author: "Community Team",
    category: "Impact",
    readingTime: "6 min read",
    content: [
      "Floating Doctors anchor near the resort during quarterly medical brigades. Our dock becomes a logistics hub for supplies and volunteer briefings.",
      "This season we delivered prenatal vitamins, dental kits, and solar chargers donated by recent guests. Nurses set up triage under the overwater palapa while local translators assisted.",
      "In the evenings volunteers decompress with restorative swims and farm-to-table meals. We gather anonymous impact stories and share them with future donors.",
      "Visitors can support by packing requested items from our wish list or sponsoring a follow-up telemedicine consult. Concierge staff coordinate drop-offs during check-in.",
    ],
  },
  {
    slug: "dolphin-conservation",
    title: "Respectful Dolphin Encounters",
    excerpt: "Our naturalist explains best practices for observing resident pods in Dolphin Bay.",
    date: "Nov 30, 2024",
    image: "/images/hero-bay.jpg",
    author: "Marina, Lead Naturalist",
    category: "Nature",
    readingTime: "4 min read",
    content: [
      "Dolphin Bay hosts one of the largest populations of resident bottlenose dolphins in Panama. We limit departures to two boats at a time and never chase pods.",
      "Captains idle the engines once dolphins approach, allowing them to dictate distance. Guests receive cue cards covering fin identification and respectful photography.",
      "We log each sighting with GPS coordinates and calf observations, sharing the data with local marine biologists who monitor long-term population health.",
      "If dolphins signal discomfort, we pivot to mangrove snorkels or bird watching. Protecting their habitat ensures future guests can witness the same magic.",
    ],
  },
];
