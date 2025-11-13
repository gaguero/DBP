/**
 * Stock Photo Utility
 * Provides Unsplash stock photos for the site
 */

const UNSPLASH_SOURCE = "https://images.unsplash.com";

/**
 * Get Unsplash photo URL with specific dimensions and search terms
 */
export function getStockPhoto(
  keywords: string,
  width: number = 1920,
  height: number = 1080,
  photoId?: string
): string {
  if (photoId) {
    return `${UNSPLASH_SOURCE}/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format`;
  }
  
  // Use Unsplash Source API with keywords
  const searchTerms = keywords.replace(/\s+/g, ",");
  return `https://source.unsplash.com/featured/${width}x${height}/?${searchTerms}`;
}

/**
 * Predefined stock photos for common use cases
 */
export const stockPhotos = {
  // Hero images
  heroOcean: getStockPhoto("tropical-ocean-sunset", 1920, 1080, "1509391366360-2e959784a276"),
  heroBay: getStockPhoto("tropical-bay-panama", 1920, 1080, "1542838132-92c53300491e"),
  heroParadise: getStockPhoto("tropical-paradise-beach", 1920, 1080, "1416879595882-3373a0480b5b"),
  
  // Sustainability
  solarPanels: getStockPhoto("solar-panels-renewable-energy", 800, 600, "1509391366360-2e959784a276"),
  rainwater: getStockPhoto("rainwater-collection-barrel", 800, 600, "1542838132-92c53300491e"),
  garden: getStockPhoto("tropical-garden-vegetables", 800, 600, "1416879595882-3373a0480b5b"),
  compost: getStockPhoto("compost-organic-waste", 800, 600, "1559827260-dc66d52bef19"),
  reusable: getStockPhoto("reusable-straw-coconut-drink", 800, 600, "1506905925346-21bda4d32df4"),
  mosquitoNet: getStockPhoto("mosquito-net-bed-tropical", 800, 600, "1509391366360-2e959784a276"),
  sustainability: getStockPhoto("sustainability-eco-resort", 1920, 1080, "1542838132-92c53300491e"),
  conservation: getStockPhoto("conservation-environment-protection", 1920, 1080, "1416879595882-3373a0480b5b"),
  footprint: getStockPhoto("carbon-footprint-sustainability", 1920, 1080, "1559827260-dc66d52bef19"),
  
  // Rooms & Accommodations
  roomView: getStockPhoto("luxury-resort-room-ocean-view", 1920, 1080, "1506905925346-21bda4d32df4"),
  roomInterior: getStockPhoto("tropical-resort-room-interior", 1920, 1080, "1509391366360-2e959784a276"),
  overwater: getStockPhoto("overwater-bungalow-tropical", 1920, 1080, "1542838132-92c53300491e"),
  
  // Dining
  dining: getStockPhoto("tropical-restaurant-dining", 1920, 1080, "1416879595882-3373a0480b5b"),
  farmToTable: getStockPhoto("farm-to-table-fresh-produce", 800, 600, "1559827260-dc66d52bef19"),
  seafood: getStockPhoto("fresh-seafood-tropical", 800, 600, "1506905925346-21bda4d32df4"),
  
  // Experiences
  dolphin: getStockPhoto("dolphin-swimming-ocean", 1920, 1080, "1509391366360-2e959784a276"),
  snorkeling: getStockPhoto("snorkeling-tropical-reef", 1920, 1080, "1542838132-92c53300491e"),
  kayaking: getStockPhoto("kayaking-tropical-waters", 1920, 1080, "1416879595882-3373a0480b5b"),
  hiking: getStockPhoto("jungle-hiking-tropical-forest", 1920, 1080, "1559827260-dc66d52bef19"),
  
  // Community
  community: getStockPhoto("indigenous-community-panama", 1920, 1080, "1506905925346-21bda4d32df4"),
  healthcare: getStockPhoto("healthcare-community-medical", 1920, 1080, "1509391366360-2e959784a276"),
  education: getStockPhoto("education-children-learning", 1920, 1080, "1542838132-92c53300491e"),
  
  // About
  islandAerial: getStockPhoto("aerial-view-tropical-island", 1920, 768, "1416879595882-3373a0480b5b"),
  location: getStockPhoto("tropical-location-map-panama", 1920, 1080, "1559827260-dc66d52bef19"),
  
  // Default/Placeholder
  default: getStockPhoto("tropical-paradise", 1920, 1080, "1506905925346-21bda4d32df4"),
} as const;

