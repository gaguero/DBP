import Image from "next/image";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { activities } from "@/content/data";

const heroParagraphs = [
  "Discovering a travel destination that truly aligns with your values can be challenging.",
  "You need a place that combines comfort, unique and personalized experiences, and sustainability without compromising your ethical and environmental values.",
  "Dolphin Blue Paradise is here.",
];

const legacyIntro =
  "We provide a fully personalized and memorable stay with farm-to-table meals, customized excursions, and a commitment to sustainability. We will address all travel details, from flights to the final boat ride. Our resort operates on green energy, uses eco-friendly materials, and sources local produce for a luxurious, environmentally responsible stay.";

const locationParagraph =
  "Dolphin Blue Paradise is a 100% off-the-grid luxury eco-resort located on Isla San Cristobal in Dolphin Bay; a hilly island with plantations, farms, and the indigenous villages of Bocastorito and Aldana.";

const featureHighlights = [
  {
    title: "Breakfast",
    description:
      "Start the day with a delicious breakfast made of fresh fruit from the garden, juices, fresh eggs from Dolphin Bay, homemade bread and jams.",
  },
  {
    title: "Free Wi-Fi",
    description: "Internet is free and available around the entire property.",
  },
  {
    title: "Tropical Garden",
    description:
      "Enjoy a beautiful walk surrounded by nature in our 5-acre garden cared for by our head gardener and nature expert, Roque.",
  },
  {
    title: "Sea View",
    description:
      "You'll never be as close to the sea as in Dolphin Blue Paradise. Enjoy a swim in the crystal clear water and observe marine life up close.",
  },
];

const splitHighlight = {
  heading: "Discover our rooms with a beautiful sea view",
  description:
    "At Dolphin Blue Paradise all rooms come with a wardrobe and a private bathroom, plus a private terrace to enjoy the breeze and the view.",
  cta: {
    label: "Discover Our Rooms",
    href: "/rooms",
  },
};

const newsItems = [
  {
    title: "Dolphin Bay",
    excerpt: "Experience the beauty of the dolphins and the calm of the bay!",
  },
  {
    title: "Chocolate Farm Tour",
    excerpt:
      "Visit the indigenous Ngabe cacao community or kayak to our neighbors to learn how they grow, harvest, and process cacao into chocolate.",
  },
];

const testimonial = {
  quote:
    "My wife and I have traveled to over 50 countries over the course of our adult lives... Dolphin Blue Paradise is one of, if not THE, most breathtaking, gorgeous, and hospitable locations we have experienced.",
  author: "Recent Your Reviews",
};

const diaryHighlights = activities.slice(0, 4).map((activity) => ({
  title: activity.name,
  description: activity.summary,
  image: activity.image,
}));

const contactInfo = [
  "WhatsApp: +507 6346 0605",
  "contact@dolphinblueparadise.com",
  "Isla San Cristobal - Bahia Delfines - Bocas del Toro - Panama",
];

const disclaimer =
  "Dolphin Blue Paradise is not liable for any guests belongings. While Dolphin Bay is one of the safest places in the world we ask all of our guests to safekeep their belongings.";

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <Image
          src="/images/hero-bay.jpg"
          alt="Aerial view of Dolphin Bay with lush island and turquoise waters"
          fill
          priority
          className="object-cover"
        />
        <div className="home-hero__overlay" />
        <div className="home-container home-hero__content">
          <div className="home-hero__card">
            <p className="home-hero__eyebrow">Paradise between the jungle &amp; the sea</p>
            <h1 className="home-hero__title">A Personalized Eco-Luxury Escape</h1>
            <div className="home-hero__body">
              {heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="home-hero__actions">
              <Button href="#booking" trackingEvent="cta_plan_escape" trackingData={{ section: "hero" }}>
                Plan Your Escape
              </Button>
              <Button
                href="/experiences"
                variant="secondary"
                trackingEvent="cta_explore_experiences"
                trackingData={{ section: "hero" }}
              >
                Explore Experiences
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container home-section__intro">
          <div className="home-intro">
            <p>{legacyIntro}</p>
            <p>{locationParagraph}</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="home-feature-grid">
            {featureHighlights.map((feature) => (
              <Card key={feature.title} className="home-feature">
                <h3 className="home-feature__title">{feature.title}</h3>
                <p className="home-feature__text">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="home-split">
            <div className="home-split__media">
              <Image
                src="/images/rooms-view.jpg"
                alt="Sea view room with natural light"
                width={720}
                height={480}
                className="home-split__image"
              />
            </div>
            <div className="home-split__content">
              <h2 className="home-section__heading">{splitHighlight.heading}</h2>
              <p className="home-section__text">{splitHighlight.description}</p>
              <Button href={splitHighlight.cta.href} variant="secondary">
                {splitHighlight.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="home-news">
            <div className="home-news__column">
              <h3 className="home-section__subheading">Experience Paradise</h3>
              <div className="home-news__list">
                {newsItems.map((item) => (
                  <div key={item.title} className="home-news__item">
                    <h4 className="home-news__title">{item.title}</h4>
                    <p className="home-news__excerpt">{item.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="home-testimonial">
              <h3 className="home-section__subheading">Your Reviews</h3>
              <blockquote className="home-testimonial__quote">{testimonial.quote}</blockquote>
              <p className="home-testimonial__author">{testimonial.author}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <h3 className="home-section__subheading home-center">Our Little Paradise by the Sea</h3>
          <div className="home-blog">
            {diaryHighlights.map((post) => (
              <article key={post.title} className="home-blog__card">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={480}
                  height={320}
                  className="home-blog__image"
                />
                <div className="home-blog__body">
                  <h4 className="home-blog__title">{post.title}</h4>
                  <p className="home-blog__text">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container home-contact">
          <div className="home-contact__info">
            <h3 className="home-section__subheading">Contact us</h3>
            <p className="home-section__text">
              If you wish to support these communities, we greatly appreciate donations of:
            </p>
            <ul className="home-contact__list">
              {contactInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="home-contact__map">
            <Image
              src="/images/hero-bay.jpg"
              alt="Map view of Dolphin Bay"
              width={640}
              height={360}
              className="home-contact__image"
            />
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container home-disclaimer">
          <p>{disclaimer}</p>
        </div>
      </section>

      <div className="home-container">
        <BookingWidgetPlaceholder />
      </div>
    </div>
  );
}



