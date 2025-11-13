import Image from "next/image";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { FeedbackRoot } from "@/components/feedback/feedback-root";
import { FeedbackSection } from "@/components/feedback/feedback-section";
import { isCommentsFeatureEnabled } from "@/lib/feature-flags";

export default function Home() {
  const commentsEnabled = isCommentsFeatureEnabled();

  const pageContent = (
    <div className="home-page">
      <NewsletterPopup />
      <FeedbackSection id="home-hero" label="Hero principal">
        <section className="home-hero">
          <div className="home-hero__container">
            <div className="home-hero__image-wrapper bg-gray-200 flex items-center justify-center">
              <p className="text-xs text-gray-500 text-center px-4 italic">
                Visual needed: Hero image - Serene sunset view of Dolphin Bay with calm waters and tropical landscape
              </p>
            </div>
            <div className="home-hero__content">
              <div className="home-hero__card">
                <h1 className="home-hero__title">PARADISE BETWEEN THE JUNGLE & THE SEA</h1>
                <p className="home-hero__subtitle">A Personalized Eco-Luxury Escape</p>
                <button className="home-hero__button">Book Now</button>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-amenities" label="Amenidades destacadas">
        <section className="home-section home-amenities">
          <div className="home-container">
            <div className="home-amenities-grid">
              <div className="home-amenity-card">
                <div className="home-amenity-icon">
                  <Image
                    src="/images/amenities_icon_breakfast.svg"
                    alt="Breakfast"
                    width={30}
                    height={30}
                  />
                </div>
                <h3 className="home-amenity__title">Breakfast</h3>
                <p className="home-amenity__text">Fresh fruit from the garden, homemade bread, fresh eggs from Dolphin Bay, and delicious jams.</p>
              </div>
              <div className="home-amenity-card">
                <div className="home-amenity-icon">
                  <Image
                    src="/images/amenities_icon_garden.svg"
                    alt="Tropical Garden"
                    width={30}
                    height={30}
                  />
                </div>
                <h3 className="home-amenity__title">Tropical Garden</h3>
                <p className="home-amenity__text">Walk through our 5-acre tropical paradise with exotic plants and beautiful wildlife.</p>
              </div>
              <div className="home-amenity-card">
                <div className="home-amenity-icon">
                  <Image
                    src="/images/amenities_icon_seaview_correct.svg"
                    alt="Sea View"
                    width={30}
                    height={30}
                  />
                </div>
                <h3 className="home-amenity__title">Sea View</h3>
                <p className="home-amenity__text">Crystal clear waters for swimming while observing amazing marine life up close.</p>
              </div>
              <div className="home-amenity-card">
                <div className="home-amenity-icon">
                  <Image
                    src="/images/amenities_icon_rainforest.png"
                    alt="Primary Rainforest"
                    width={30}
                    height={30}
                  />
                </div>
                <h3 className="home-amenity__title">Primary Rainforest</h3>
                <p className="home-amenity__text">Explore our backyard rainforest with sloths, monkeys, birds, and cacao trees on guided hikes.</p>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-carousel-primary" label="Carrusel principal">
        <section className="home-section home-carousel">
          <div className="home-container">
            <div className="home-carousel-wrapper">
              <div className="home-carousel-track">
              <div className="home-carousel-slide home-carousel-slide--active">
                <div className="home-carousel-image">
                  <Image
                    src="/images/jeremy-wermeille-unsplash.jpg"
                    alt="Welcome to Dolphin Blue Paradise"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">WELCOME</h2>
                  <p className="home-section__text">Discovering a travel destination that truly aligns with your values can be challenging.</p>
                  <p className="home-section__text">You need a place that combines comfort, unique and personalized experiences, and sustainability without compromising your ethical and environmental valuesâ€¦</p>
                  <p className="home-section__text">Dolphin Blue Paradise is here.</p>
                  <Button href="/plan-your-journey" className="home-rooms__button">
                    Plan Your Escape
                  </Button>
                </div>
              </div>
              
              <div className="home-carousel-slide">
                <div className="home-carousel-image">
                  <Image
                    src="/images/screenshot-paradise.jpg"
                    alt="Our personalized service"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">OUR SERVICE</h2>
                  <p className="home-section__text">We provide a fully personalized and memorable stay with farm-to-table meals, customized excursions, and a commitment to sustainability. To alleviate any concerns, we will address all travel details, from flights to the final boat ride. Our resort operates on green energy, uses eco-friendly materials, and sources local produce for a luxurious, environmentally responsible stay. You&apos;ll immerse yourself in one of the world&apos;s most biodiverse and rich environments, witnessing firsthand the positive impact of your visit on the environment and local communities through our extensive sustainable practices. Our attentive service, tailored itineraries, and special dietary accommodations ensure every detail is perfectly suited to you.</p>
                </div>
              </div>
              
              <div className="home-carousel-slide">
                <div className="home-carousel-image">
                  <Image
                    src="/images/dolphin-bay-location.jpg"
                    alt="A unique location in Dolphin Bay"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">A UNIQUE LOCATION</h2>
                  <p className="home-section__text">Dolphin Blue Paradise is a 100% off-the-grid luxury eco-resort located on Isla San Cristobal in Dolphin Bay; a hilly island with plantations, farms, and the indigenous villages of Bocastorito and Aldana. Home to the Ngabe and Guayami Tribe, the island&apos;s biodiversity includes a primary rainforest and the bay hosts about 80 bottlenose dolphins living year-round in Dolphin Bay. Its natural beauty makes it a top tour destination in Panama. Staying with us offers a unique opportunity to immerse yourself in the tranquility and cultural richness of one of Panama&apos;s most picturesque areas.</p>
                </div>
              </div>
              
              <div className="home-carousel-slide">
                <div className="home-carousel-image">
                  <Image
                    src="/images/rooms-original.jpg"
                    alt="Our rooms with beautiful sea views"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">OUR ROOMS</h2>
                  <p className="home-section__text">Discover our rooms with a beautiful sea view and a private terrace for everyones needs. At Dolphin Blue Paradise all rooms come with a wardrobe and a private bathroom.</p>
                  <Button href="/rooms" className="home-rooms__button">
                    Discover Our Rooms
                  </Button>
                </div>
              </div>
            </div>
            
              <div className="home-carousel-navigation">
                <button className="home-carousel-dot home-carousel-dot--active" data-slide="0"></button>
                <button className="home-carousel-dot" data-slide="1"></button>
                <button className="home-carousel-dot" data-slide="2"></button>
                <button className="home-carousel-dot" data-slide="3"></button>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-reviews" label="Reseñas destacadas">
        <section className="home-section home-reviews">
          <div className="home-reviews-container">
            <div className="home-reviews-left">
              <h2 className="home-section__heading">YOUR REVIEWS</h2>
              <p className="home-reviews__subtitle">What our guests are saying</p>
            </div>
            <div className="home-reviews-right">
              <div className="home-review-card">
                <div className="home-review__quote-mark">&quot;</div>
                <blockquote className="home-review__quote">
                  My wife and I have traveled to over 50 countries over the course of our adult lives, stayed in hotels, resorts, and destinations of all types, experienced many wonderful cultures, environments, and adventures. We can, without hesitation, confirm that Dolphin Blue Paradise is one of, if not THE, most breathtaking, gorgeous, and hospitable locations we have experienced.
                </blockquote>
                <div className="home-review__author">
                  <div className="home-review__avatar">
                    <Image
                      src="/images/guest-avatar.svg"
                      alt="Guest review"
                      width={60}
                      height={60}
                      className="home-review__avatar-image"
                    />
                  </div>
                  <div className="home-review__author-info">
                    <cite className="home-review__name">Recent Guest</cite>
                    <span className="home-review__location">USA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-carousel-secondary" label="Carrusel secundario">
        <section className="home-section home-carousel-secondary">
          <div className="home-container">
            <div className="home-carousel-wrapper">
              <div className="home-carousel-track" id="secondary-carousel-track">
              <div className="home-carousel-slide home-carousel-slide--active home-carousel-slide--reverse">
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">OUR ROOMS</h2>
                  <p className="home-section__text">Discover our rooms with a beautiful sea view and a private terrace for everyones needs. At Dolphin Blue Paradise all rooms come with a wardrobe and a private bathroom.</p>
                  <p className="home-section__text">Each accommodation is thoughtfully designed to provide comfort while maintaining our commitment to sustainability and eco-friendly practices.</p>
                  <Button href="/rooms" className="home-rooms__button">
                    Discover Our Rooms
                  </Button>
                </div>
                <div className="home-carousel-image">
                  <Image
                    src="/images/rooms-original.jpg"
                    alt="Our rooms with beautiful sea views"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
              </div>
              
              <div className="home-carousel-slide home-carousel-slide--reverse">
                <div className="home-carousel-content">
                  <h2 className="home-section__heading">EXPERIENCES</h2>
                  <p className="home-section__text">From dolphin watching in crystal clear waters to exploring primary rainforests, our curated experiences connect you with Panama&apos;s incredible biodiversity.</p>
                  <p className="home-section__text">Adventure awaits with snorkeling, surfing, kayaking, chocolate farm tours, and encounters with exotic wildlife in their natural habitat.</p>
                  <Button href="/experiences" className="home-rooms__button">
                    Explore Experiences
                  </Button>
                </div>
                <div className="home-carousel-image">
                  <Image
                    src="/images/jeremy-wermeille-unsplash.jpg"
                    alt="Exciting experiences await at Dolphin Blue Paradise"
                    width={590}
                    height={480}
                    className="home-carousel__image"
                  />
                </div>
              </div>
            </div>
            
              <div className="home-carousel-navigation" id="secondary-carousel-nav">
                <button className="home-carousel-dot home-carousel-dot--active" data-slide="0" data-carousel="secondary"></button>
                <button className="home-carousel-dot" data-slide="1" data-carousel="secondary"></button>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-gallery" label="Galería principal">
        <section className="home-section home-gallery">
          <div className="home-container">
            <h2 className="home-section__heading home-center">OUR LITTLE PARADISE BY THE SEA</h2>
            <div className="home-gallery__wrapper">
              <Image
                src="/images/Hero_sea.png"
                alt="Paradise by the sea"
                width={1200}
                height={600}
                className="home-gallery__image"
              />
            </div>
            <div className="home-gallery__actions">
              <Button href="/gallery" className="home-rooms__button">
                Experience Paradise
              </Button>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-testimonial" label="Testimonial completo">
        <section className="home-section home-testimonial-section">
          <div className="home-container">
            <div className="home-testimonial-full">
                <h3 className="home-section__subheading uppercase">YOUR REVIEWS</h3>
              <div className="home-testimonial__quote-mark">&quot;</div>
              <blockquote className="home-testimonial__quote">My wife and I have traveled to over 50 countries over the course of our adult lives, stayed in hotels, resorts, and destinations of all types, experienced many wonderful cultures, environments, and adventures. We can, without hesitation, confirm that Dolphin Blue Paradise is one of, if not THE, most breathtaking, gorgeous, and hospitable locations we have experienced. The surroundings, flora, fauna (the resident sloth!) and accommodations all fit together in a relaxing, even harmonious, manner and way of life.</blockquote>
              <div className="home-testimonial__actions">
                <Button href="#booking" className="home-rooms__button">
                  Book Your Escape
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-contact" label="Contacto">
        <section className="home-section home-contact-section">
          <div className="home-container">
            <div className="home-contact">
              <div className="home-contact__info">
                <h3 className="home-section__subheading uppercase">CONTACT US</h3>
                <div className="home-contact__details">
                  <p className="home-contact__item">WhatsApp: +507 6346 0605</p>
                  <p className="home-contact__item">contact@dolphinblueparadise.com</p>
                  <p className="home-contact__item">Isla San CristÃ³bal - Bahia delfines - Bocas Del Toro - Panama</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-disclaimer" label="Aviso legal">
        <section className="home-section home-disclaimer-section">
          <div className="home-container">
            <div className="home-disclaimer">
              <p>Dolphin Blue Paradise is not liable for any guests belongings. While Dolphin Bay is one of the safest places in the world we ask all of our guests to safekeep their belongings and not leave valuables or belongings when not in their rooms.</p>
            </div>
          </div>
        </section>
      </FeedbackSection>

      <FeedbackSection id="home-booking-widget" label="Widget de reservas">
        <section className="home-section home-booking-section">
          <div className="home-container">
            <BookingWidgetPlaceholder />
          </div>
        </section>
      </FeedbackSection>
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Initialize primary carousel
              const primarySlides = document.querySelectorAll('.home-carousel .home-carousel-slide');
              const primaryDots = document.querySelectorAll('.home-carousel .home-carousel-dot');
              let currentPrimarySlide = 0;

              // Initialize secondary carousel
              const secondarySlides = document.querySelectorAll('.home-carousel-secondary .home-carousel-slide');
              const secondaryDots = document.querySelectorAll('.home-carousel-secondary .home-carousel-dot');
              let currentSecondarySlide = 0;

              function showSlide(slides, dots, index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('home-carousel-slide--active'));
                dots.forEach(dot => dot.classList.remove('home-carousel-dot--active'));

                // Show current slide
                if (slides[index]) {
                  slides[index].classList.add('home-carousel-slide--active');
                  dots[index].classList.add('home-carousel-dot--active');
                }
              }

              // Add click handlers to primary carousel dots
              primaryDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                  currentPrimarySlide = index;
                  showSlide(primarySlides, primaryDots, currentPrimarySlide);
                });
              });

              // Add click handlers to secondary carousel dots
              secondaryDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                  currentSecondarySlide = index;
                  showSlide(secondarySlides, secondaryDots, currentSecondarySlide);
                });
              });

              // Auto-advance primary carousel every 6 seconds
              if (primarySlides.length > 1) {
                setInterval(() => {
                  currentPrimarySlide = (currentPrimarySlide + 1) % primarySlides.length;
                  showSlide(primarySlides, primaryDots, currentPrimarySlide);
                }, 6000);
              }

              // Auto-advance secondary carousel every 7 seconds (offset from primary)
              if (secondarySlides.length > 1) {
                setTimeout(() => {
                  setInterval(() => {
                    currentSecondarySlide = (currentSecondarySlide + 1) % secondarySlides.length;
                    showSlide(secondarySlides, secondaryDots, currentSecondarySlide);
                  }, 7000);
                }, 3000); // Start after 3 seconds to offset from primary
              }
            });
          `,
        }}
      />
    </div>
  );

  if (!commentsEnabled) {
    return pageContent;
  }

  return <FeedbackRoot pageId="home">{pageContent}</FeedbackRoot>;
}
