import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { rooms } from "@/content/data";
import { RoomImageCarousel } from "@/components/rooms/room-image-carousel";
import { PageNotesEditor } from "@/components/page-notes-editor";
import { stockPhotos } from "@/lib/stock-photos";
import { SwimmingCarousel } from "@/components/rooms/swimming-carousel";
import { GardenCarousel } from "@/components/rooms/garden-carousel";
import { SalonAzulCarousel } from "@/components/rooms/salon-azul-carousel";

export const metadata: Metadata = {
  title: "Accommodations | Dolphin Blue Paradise, Bocas del Toro",
  description:
    "Sea view cabanas and eco-luxury rooms in Bocas del Toro. Choose from Premium Deluxe, Sea View Cabanas, Dolphin View Rooms, or Family Jungle Rooms.",
};

export default function RoomsPage() {
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            CABANAS & ROOMS
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">with sea view</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src="/images/rooms/rooms-hero-sunset-gazebo-hammocks-dolphin-bay.avif"
          alt="Sunset view of overwater gazebo with hammocks at Dolphin Blue Paradise, Bocas del Toro - guests relaxing in hammocks enjoying the golden hour over Dolphin Bay"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Intro Paragraph */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-lg text-[var(--color-text-primary)] mb-0 leading-relaxed max-w-3xl mx-auto">
              All rooms include a private bathroom, free Wi-Fi, breakfast, sea view, electricity & ceiling fan, and a private terrace or balcony. Each room features a private balcony or patio to relax and take in views of the jungle or sea.
            </p>
          </div>
        </div>
      </section>

      {/* Room Sections */}
      {rooms.map((room, roomIndex) => {
        const isEven = roomIndex % 2 === 0;
        return (
          <section 
                key={room.slug}
            className={`h-[50vh] min-h-[500px] flex items-center ${isEven ? 'bg-white' : 'bg-[var(--color-sand)]'}`}
            style={{ paddingBlock: 0 }}
          >
            <div className="w-full mx-auto h-full relative flex" style={{ maxWidth: 'calc(1180px + (100vw - 1180px) / 2)' }}>
              {/* Image Carousel - Left Side (50%) */}
              <div className={`flex-0 flex-[0_0_50%] h-full relative ${!isEven ? 'order-2' : 'order-1'}`}>
                <RoomImageCarousel 
                  images={room.images || [room.heroImage || "/images/rooms-view.jpg"]} 
                    alt={room.name}
                  />
                </div>

              {/* Content - Right Side (50%) */}
              <div className={`flex-1 h-full flex flex-col justify-between bg-[var(--color-cloud)] overflow-y-auto ${!isEven ? 'order-1' : 'order-2'}`} style={{ paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)', paddingLeft: 'clamp(1rem, 3vw, 2rem)', paddingRight: 'clamp(1rem, 3vw, 2rem)' }}>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-[var(--color-navy)] uppercase font-light" style={{ marginBottom: '0.75rem' }}>
                    {room.name}
                  </h2>
                  <div className="flex items-center gap-4 text-sm md:text-base text-[var(--color-text-muted)]" style={{ marginBottom: '1rem' }}>
                    <span>{room.size}</span>
                    <span>•</span>
                    <span>{room.capacity}</span>
                  </div>
                  <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed" style={{ marginBottom: '1.25rem' }}>
                    {room.description}
                  </p>
                  
                  {/* Highlight List */}
                  <ul className="space-y-2">
                    {room.amenities.map((amenity, idx) => (
                      <li key={idx} className="text-base md:text-lg text-[var(--color-text-muted)] flex items-start gap-3">
                        <span className="text-[var(--color-gold)] mt-0.5 flex-shrink-0 text-lg md:text-xl">✓</span>
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Book Your Room CTA */}
                <div className="mt-auto pt-6">
                  <Button href="/contact" variant="primary" className="inline-block w-auto whitespace-nowrap" style={{ padding: '1rem 2.5rem', fontSize: '1rem', marginTop: 0, marginBottom: 0 }}>
                    Book Your Room
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Swimming & Sunbathing Section */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl mb-6 text-center uppercase font-light text-[var(--color-navy)]">
            SWIMMING & SUNBATHING
          </h2>
          
          {/* Image Carousel */}
          <div className="mb-8">
            <SwimmingCarousel />
          </div>
          
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
              Whether you prefer to relax on the swim platform, sunbathe on a sunbed, or unwind in a hammock, Dolphin Blue Paradise has it all!
            </p>
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed">
              We provide lounge chairs for sunbathing and a swim platform for swimming and snorkeling. You can observe starfish, sea urchins, and other marine life directly beneath the restaurant or swim platform.
            </p>
          </div>
        </div>
      </section>

      {/* Tropical Garden Section */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl mb-6 text-center uppercase font-light text-[var(--color-navy)]">
            TROPICAL GARDEN
          </h2>
          
          {/* Image Carousel */}
          <div className="mb-8">
            <GardenCarousel />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
              We invite all our guests to explore our beautiful tropical garden, lovingly maintained by our head gardener and nature expert, Roque, and his team. Our dinner and breakfast menus feature tropical fruits from our garden, including mango, banana, pineapple, lime, passion fruit, rambutan (lychee), starfruit, guava, mangosteen, water apple, custard fruit, soursop, mandarins, coconut, guava, plantains, and more.
            </p>
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
              In addition to fruits, our tropical garden boasts a variety of tropical flowers such as hibiscus, rare orchids, bird of paradise, lobster claws, frangipani, jasmine, and more.
            </p>
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed">
              As you stroll through the garden, you&apos;ll also notice we grow our own herbs and vegetables, including ginger, turmeric, lettuce, spinach, cilantro, lemongrass, tomatoes, peppers, and many others—all served farm-to-table in our restaurant.
            </p>
          </div>
        </div>
      </section>

      {/* Salon Azul Section */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl mb-6 text-center uppercase font-light text-[var(--color-navy)]">
            SALON AZUL
          </h2>
          
          {/* Image Carousel */}
          {/* TODO: Confirm photos to use for Salon Azul carousel - see salon-azul-carousel.tsx for details */}
          <div className="mb-8">
            <SalonAzulCarousel />
          </div>
          
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
              The newly renovated Salon Azul is a serene space where guests can relax, read, meditate, play board games, or practice yoga on a rainy day. The patio outside Salon Azul offers a small outdoor workout area equipped with weights, dumbbells, a fitness ball, and yoga mats for guests to enjoy.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section bg-[var(--color-cloud)]">
        <div className="container">
          <h2 className="font-display text-2xl mb-8 text-center uppercase font-light">
            AMENITIES
          </h2>
          
          {/* In-Room Amenities */}
          <div className="mb-12">
            <h3 className="font-display text-lg mb-6 text-center uppercase font-light">IN-ROOM</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* King/Cal King Beds */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 12v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 12l2-2m16 2l-2-2M7 10h10M7 18h10" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">KING BEDS</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Organic cotton linens, memory foam mattresses</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">100% organic cotton bedlinen. CertiPUR-US certified memory foam mattresses with low VOCs for healthy sleep.</p>
                </div>
              </div>

              {/* Free Wi-Fi */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">FREE WI-FI</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Available property-wide</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">High-speed Wi-Fi available in all rooms, terraces, and common areas.</p>
                </div>
              </div>

              {/* Modern Bathroom */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <circle cx="12" cy="4" r="2" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v2M10 8l-1 1.5M14 8l1 1.5M9 9.5l-1 1.5M15 9.5l1 1.5M8 11l-1 1.5M16 11l1 1.5M7 12.5l-0.5 1M17 12.5l0.5 1" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">MODERN BATHROOM</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Flush toilets & hot showers</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Modern flush toilets and hot showers in all rooms. Family Jungle Rooms include bathtub and shower. Eco-friendly amenities and purified rainwater provided.</p>
                </div>
              </div>

              {/* Private Terrace */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 18v-3h18v3M3 15V9h18v6M3 9V6h18v3M3 6V3h18v3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18h2M16 18h2" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">PRIVATE TERRACE</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Sea view balcony</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Private terrace or balcony with sea views. Premium Deluxe Cabanas include loungers and desk. Dolphin View Rooms offer panoramic Dolphin Bay views.</p>
                </div>
              </div>

              {/* Ceiling Fans */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l-1.5 6 1.5 6 1.5-6L12 3zM5 12h14M12 3v18" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">CEILING FANS</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Climate control in all rooms</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">All cabins equipped with ceiling fans for natural climate control. Combined with tropical location and refreshing sea breezes.</p>
                </div>
              </div>

              {/* Mosquito Protection */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">MOSQUITO PROTECTION</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Window netting & bed nets</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Mosquito netting around windows and chitra nets over beds in all cabins for protected sleep.</p>
                </div>
              </div>

              {/* Robe & Towels */}
              <div className="group relative flex flex-col items-center text-center p-4 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20M12 2l-2.5 3.5h5L12 2zM12 2l2.5 3.5h-5L12 2zM9.5 5.5h5M9.5 5.5v15h5v-15M12 8v2M12 12v2M12 16v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 4h4M10 6h4" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">ROBE & TOWELS</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Complimentary toiletries & purified water</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Plush robe, swim towel, and eco-friendly toiletries provided. Daily purified rainwater from our closed-loop collection system.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Property Amenities */}
          <div>
            <h3 className="font-display text-lg mb-6 text-center uppercase font-light">PROPERTY</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Breakfast */}
              <div className="group relative flex flex-col items-center text-center p-5 min-h-[140px] border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h6m-3-3v6" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">BREAKFAST</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Fresh garden produce</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Fresh fruit, homemade bread, fresh eggs, and jams. All locally sourced, organic.</p>
                </div>
              </div>

              {/* Blå Bar & Restaurant */}
              <div className="group relative flex flex-col items-center text-center p-5 min-h-[140px] border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">BLÅ BAR & RESTAURANT</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Over-the-water dining</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-y-auto">Over-the-water restaurant with Dolphin Bay views. European-inspired menus with farm-to-table ingredients.</p>
                </div>
              </div>

              {/* Sea View */}
              <div className="group relative flex flex-col items-center text-center p-5 min-h-[140px] border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 18c2 0 4-2 6-2s4 2 6 2 4-2 6-2M2 14c2 0 4-2 6-2s4 2 6 2 4-2 6-2M2 10c2 0 4-2 6-2s4 2 6 2 4-2 6-2" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">SEA VIEW</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Crystal clear waters</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Direct access to crystal clear waters from all accommodations. Observe diverse marine life, including resident bottlenose dolphins, tropical fish, and coral reefs.</p>
                </div>
              </div>

              {/* Tropical Garden */}
              <div className="group relative flex flex-col items-center text-center p-5 min-h-[140px] border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20M12 2l-4 8h8l-4-8zM12 2l4 8H8l4-8zM8 10h8M7 12l-1 2h12l-1-2M6 14l-0.5 1h13l-0.5-1" />
                    <ellipse cx="10" cy="6" rx="1.5" ry="1" strokeWidth={1.5} />
                    <ellipse cx="14" cy="6" rx="1.5" ry="1" strokeWidth={1.5} />
                    <ellipse cx="9" cy="8" rx="1.2" ry="0.8" strokeWidth={1.5} />
                    <ellipse cx="15" cy="8" rx="1.2" ry="0.8" strokeWidth={1.5} />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">TROPICAL GARDEN</h4>
                <p className="font-sans text-xs opacity-90 mb-0">5-acre nature walk</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">5-acre tropical garden with exotic plants and wildlife. Nature walks available.</p>
                </div>
              </div>

              {/* Primary Rainforest */}
              <div className="group relative flex flex-col items-center text-center p-5 min-h-[140px] border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-ocean)]/20 cursor-pointer">
                <div className="w-10 h-10 mb-2 text-[var(--color-ocean)]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 20h2v-8H5v8zM9 20h2v-10H9v10zM13 20h2v-9h-2v9zM17 20h2v-11h-2v11z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12c1-2 2-3 3-3s2 1 3 3M12 11c1-2 2-3 3-3s2 1 3 3M15 10c0.5-1 1-1.5 1.5-1.5s1 0.5 1.5 1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20h16" />
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-light uppercase mb-1">PRIMARY RAINFOREST</h4>
                <p className="font-sans text-xs opacity-90 mb-0">Guided hikes available</p>
                <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center text-center border border-[var(--color-ocean)]/20">
                  <p className="font-sans text-[6px] text-[var(--color-text-primary)] leading-tight px-1.5 max-h-full overflow-hidden">Primary rainforest on property. Home to sloths, monkeys, birds, and cacao trees. Guided hikes available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Availability & Rates */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase font-light">
                    AVAILABILITY & RATES
                  </h2>
          <div className="bg-white border border-black/10 rounded-lg p-8">
            <p className="text-[var(--color-text-primary)] mb-6 text-center">
              Our rates vary by season and room type. Transfers from Bocas Town are complimentary for stays of four nights or more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-l-4 border-[var(--color-gold)] pl-4">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-2 uppercase font-light">PEAK SEASON</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  December - April: Higher rates apply. Advance booking recommended.
                </p>
              </div>
              <div className="border-l-4 border-[var(--color-ocean)] pl-4">
                <h3 className="font-display text-xl text-[var(--color-navy)] mb-2 uppercase font-light">GREEN SEASON</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  May - November: Special rates available. Perfect for nature enthusiasts.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button href="/contact" variant="primary">
                Check Availability & Rates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers & Packages */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-[var(--color-navy)] mb-4 uppercase font-light">
                      SPECIAL OFFERS & PACKAGES
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Enhance your stay with curated packages that combine accommodations with unforgettable experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Romantic Escape */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/packages/romantic-escape-premium-deluxe-cabana-terrace-sunset.jpeg"
                  alt="Premium Deluxe Cabana terrace at sunset - Romantic Escape package at Dolphin Blue Paradise, Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3 uppercase font-light">ROMANTIC ESCAPE</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Perfect for couples seeking an intimate, luxurious getaway with personalized experiences.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Private Premium Deluxe Cabana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Romantic dinner on terrace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Couples massage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Sunset dolphin cruise</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Best seasons: Year-round. Honeymoon add-ons available.
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Adventure Package */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/packages/adventure-package-snorkeling-kayaking-dolphin-bay.jpeg"
                  alt="Snorkeling and kayaking in Dolphin Bay - Adventure Package at Dolphin Blue Paradise, Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3 uppercase font-light">ADVENTURE PACKAGE</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  For active travelers who want to experience the best of Dolphin Bay&apos;s outdoor adventures.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Multiple activity excursions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Snorkeling and kayaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Rainforest hike</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Chocolate farm tour</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Best seasons: Year-round. Surfing add-on available November to April.
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Private Island Buyout */}
            <div className="bg-white rounded overflow-hidden border border-black/10 hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/packages/private-island-buyout-aerial-view-entire-resort.jpeg"
                  alt="Aerial view of entire Dolphin Blue Paradise resort - Private Island Buyout package, Bocas del Toro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-3 uppercase font-light">PRIVATE ISLAND BUYOUT</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Exclusive resort buyout for groups, families, or corporate retreats seeking complete privacy.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Entire resort exclusivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Customized itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Private chef and staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)] mt-1">•</span>
                    <span>Flexible dates</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                  Minimum group size: 8 guests. Advance booking required (3+ months recommended).
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="section bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-forest)] text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6 uppercase font-light">
            FIND YOUR PLACE BETWEEN THE JUNGLE AND THE SEA
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience personalized eco-luxury in one of Panama&apos;s most biodiverse destinations.
          </p>
          <Button href="/contact" variant="secondary" className="bg-white text-[var(--color-ocean)] border-white hover:bg-white/90">
            Book Your Eco-Luxury Stay
          </Button>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <PageNotesEditor pageId="rooms" />
        </div>
      </section>
    </div>
  );
}
