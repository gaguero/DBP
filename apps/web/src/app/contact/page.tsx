import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { ContactForm } from "@/components/contact-form";
import { TransferPricesButton } from "@/components/transfer-prices-button";
import { FAQNotesEditor } from "@/components/faq-notes-editor";
import { faqs } from "@/content/data";
import { stockPhotos } from "@/lib/stock-photos";

export const metadata: Metadata = {
  title: "Contact & Reservations | Dolphin Blue Paradise",
  description:
    "Complete booking and planning hub. Book your eco-luxury escape in Bocas del Toro via WhatsApp, email, or our booking widget. Get travel logistics, FAQs, and concierge support all in one place.",
};

const packingList = [
  { category: "Essentials", items: ["Passport and travel documents", "Travel insurance", "Cash (USD)", "Credit cards"] },
  {
    category: "Clothing",
    items: [
      "Lightweight, breathable clothing",
      "Swimwear (multiple sets)",
      "Sun hat and sunglasses",
      "Light rain jacket",
      "Comfortable walking shoes",
      "Sandals or water shoes",
    ],
  },
  {
    category: "Health & Safety",
    items: [
      "Reef-safe sunscreen (SPF 30+)",
      "Insect repellent (DEET-free recommended)",
      "Prescription medications",
      "First aid kit",
      "Motion sickness medication (for boat transfers)",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-0 pb-0 pt-0">
      {/* Title Section */}
      <section className="section page-title-section bg-white">
        <div className="container max-w-4xl">
          <h1 className="font-sans text-xl md:text-2xl text-black mb-4 text-center uppercase" style={{ fontWeight: 100 }}>
            CONTACT / RESERVATIONS
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-black"></div>
            <span className="italic lowercase text-sm md:text-base font-serif text-black">Plan Your Stay</span>
            <div className="h-px w-8 bg-black"></div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-black">
        <Image
          src={stockPhotos.heroBay}
          alt="Dolphin Blue Paradise - Contact and Reservations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </section>

    <div className="space-y-24 pb-24">

      {/* Multi-Channel Contact */}
      <section className="section">
        <div className="container max-w-6xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-4 text-center uppercase">GET IN TOUCH</h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto">
            Choose your preferred way to reach us. Different guests have different comfort channels—we offer all to ensure you can connect easily.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Contact Form */}
            <div>
              <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase">SEND US A MESSAGE</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                For detailed inquiries, travel planning, and special requests. We&apos;ll respond within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Quick Contact Methods */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase">QUICK CONTACT OPTIONS</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  For instant questions or immediate assistance, reach out via these channels.
                </p>
              </div>
              
              <div className="grid gap-4">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">💬</div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-[var(--color-navy)] mb-4">WhatsApp</h4>
              <Button
                href="https://wa.me/50763460605"
                variant="primary"
                className="w-full"
              >
                Message Us on WhatsApp
              </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">📞</div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-[var(--color-navy)] mb-4">Phone</h4>
                      <Button
                        href="tel:+50763460605"
                        variant="secondary"
                        className="w-full"
                      >
                        Call +507 6346 0605
                      </Button>
                    </div>
                  </div>
            </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">📧</div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-[var(--color-navy)] mb-4">Email</h4>
              <Button
                href="mailto:contact@dolphinblueparadise.com"
                variant="secondary"
                className="w-full"
              >
                Send Email
              </Button>
                    </div>
                  </div>
            </Card>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-[var(--color-text-muted)] border-t border-black/10 pt-8">
            <p className="font-semibold text-[var(--color-navy)] mb-2">Physical Address</p>
            <p>Isla San Cristóbal - Bahia Delfines - Bocas del Toro - Panama</p>
          </div>
        </div>
      </section>

      {/* Live Booking Widget */}
      <section className="section booking-section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase">BOOK YOUR STAY</h2>
          <BookingWidgetPlaceholder />
        </div>
      </section>

      {/* Location Map */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-6 text-center uppercase">LOCATION</h2>
          <div className="relative h-96 rounded overflow-hidden border border-black/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890123!2d-82.2565205!3d9.2248377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa61debe2e6f377%3A0xb5598453677aeaef!2sDolphin+Blue+Paradise!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&q=Isla+San+Cristóbal,+Dolphin+Bay,+Bocas+del+Toro,+Panama"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dolphin Blue Paradise Location Map"
            />
          </div>
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
            Isla San Cristóbal, Dolphin Bay, Bocas del Toro, Panama
          </p>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-2">
            <a
              href="https://maps.app.goo.gl/jWoqiimsjVSvLwRc7"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-ocean)]"
            >
              View on Google Maps →
            </a>
          </p>
        </div>
      </section>

      {/* Getting Here - Travel Logistics */}
      <section className="section bg-[var(--color-sand)]">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-8 text-center uppercase">GETTING HERE</h2>
          
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase">YOUR WAY TO PARADISE</h3>
            <p className="text-lg text-[var(--color-text-primary)] mb-6 max-w-3xl mx-auto">
              Dolphin Blue Paradise is located on the North Eastern side of Dolphin Bay in the Bocas Del Toro archipelago off of Panama&apos;s Northern Caribbean Coast.
            </p>
            <p className="text-base text-[var(--color-text-muted)] mb-6 max-w-2xl mx-auto">
              Should you need help organizing travel arrangements, please feel free to email us at{" "}
              <a href="mailto:contact@dolphinblueparadise.com" className="text-[var(--color-ocean)] hover:underline">
                contact@dolphinblueparadise.com
              </a>
              {" "}or WhatsApp us on{" "}
              <a href="https://wa.me/50763460605" className="text-[var(--color-ocean)] hover:underline">
                +507 6346 0605
              </a>
              {" "}and we can assist making your ideal travel arrangements.
            </p>
          </div>
          
          {/* Visual Journey Map */}
          <div className="mb-12">
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
                <div className="text-center flex-1 max-w-[200px]">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold text-xl mb-3 mx-auto shadow-lg">1</div>
                  <p className="text-base font-semibold text-[var(--color-navy)] mb-1">Panama City</p>
                <p className="text-xs text-[var(--color-text-muted)]">International Flight</p>
              </div>
                <div className="hidden md:block text-[var(--color-gold)] text-3xl font-bold">→</div>
                <div className="md:hidden text-[var(--color-gold)] text-2xl font-bold my-2">↓</div>
                <div className="text-center flex-1 max-w-[200px]">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold text-xl mb-3 mx-auto shadow-lg">2</div>
                  <p className="text-base font-semibold text-[var(--color-navy)] mb-1">Bocas Town</p>
                <p className="text-xs text-[var(--color-text-muted)]">Regional Flight</p>
              </div>
                <div className="hidden md:block text-[var(--color-gold)] text-3xl font-bold">→</div>
                <div className="md:hidden text-[var(--color-gold)] text-2xl font-bold my-2">↓</div>
                <div className="text-center flex-1 max-w-[200px]">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-ocean)] text-white flex items-center justify-center font-bold text-xl mb-3 mx-auto shadow-lg">3</div>
                  <p className="text-base font-semibold text-[var(--color-navy)] mb-1">Isla San Cristóbal</p>
                <p className="text-xs text-[var(--color-text-muted)]">Water Taxi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Routes - Detailed */}
          <div className="mb-12 space-y-4">
            {/* From Panama City */}
            <details className="group border border-black/10 rounded-lg overflow-hidden bg-white">
              <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-[var(--color-sand)] transition-colors">
                <h4 className="font-display text-xl text-[var(--color-navy)]">From Panama City</h4>
                <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 space-y-4 text-sm text-[var(--color-text-primary)]">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">1. DOMESTIC COMMERCIAL AIRPLANE</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    Fly into Tocumen International Airport (PTY). Once you have cleared immigration and customs, hop into an Uber and go to Marcos A. Gelabert Domestic Airport (PAC), aka Albrook Airport. From here you have the option between two airlines to Bocas Del Toro Airport (BOC), with Air Panama or with Fly Trip. We recommend that you have at least 3 hours from landing to your flight taking off from PAC or take an overnight in Casco Viejo of Panama City. We will be delighted to help you make hotel reservations at our preferred hotel, Central Hotel in Casco Viejo. Once you land in Bocas, a member of our team will greet you at the airport and we will either take a taxi or if weather permits walk together through town to our dock where one of our boats will transfer you to Dolphin Blue Paradise.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">2. DOMESTIC PRIVATE AIRPLANE</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    From Albrook Airport to Bocas. The flexibility of using a private plane can sometimes offset the extra cost of flying privately. Private planes start at $1680 each way for up to 3 people or book a plane with up to 10 people. Send us an email and we can help make your reservation with a private charter.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">3. PRIVATE CAR & DRIVER</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We can help organize a private car service in an air-conditioned 4x4. The car will take up to 2 passengers with suitcases or 4 passengers with handbags. Our Captain will meet you in Tierra Oscura and take you by boat to Dolphin Blue Paradise. It is a 7-10 hour drive depending on how many stops you make and traffic.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">4. RENTAL CAR</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We recommend that you drive to the village of Tierra Oscura from where we will pick you up by boat. The boat ride from Tierra Oscura is a short 10 minute ride. If you contact us we can send you a pin to where to meet us as well as information about parking options.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">5. BUS</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    The most economical is to take an air-conditioned Tranceibosa Bus from Panama City to Almirante. The buses leave from Albrook Bus Terminal, Gran Terminal De Transporte every day at 7 am, 6 pm, 7 pm and 8 pm. The ride takes 10-11 hours depending on traffic and driver stops. When you arrive to Almirante take a $1 per person taxi to the Terpel Gas Station in Almirante Harbor where you will meet one of our Captains and be transported for a 40 minute ride to Dolphin Blue Paradise. To reserve a seat on the Tranceibosa WhatsApp them at{" "}
                    <a href="https://wa.me/50764004509" className="text-[var(--color-ocean)] hover:underline">+507 6400 4509</a>.
                    {" "}We recommend that you bring a blanket or big scarf to stay warm on the bus as they take the air-conditioning serious.
                  </p>
                </div>
              </div>
            </details>

            {/* From San Jose, Costa Rica */}
            <details className="group border border-black/10 rounded-lg overflow-hidden bg-white">
              <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-[var(--color-sand)] transition-colors">
                <h4 className="font-display text-xl text-[var(--color-navy)]">From San José, Costa Rica</h4>
                <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 space-y-4 text-sm text-[var(--color-text-primary)]">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">1. FLY INTO SAN JOSÉ JUAN SANTA MARIA (SJO), COSTA RICA</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    Once you land and have cleared immigration, check in with Sansa Air for your flight to Bocas Airport (BOC). The flights from San José to Bocas leave on Tuesdays, Thursdays and Sundays. Once you land in Bocas, a member of our team will greet you at the airport and we will either take a taxi or if weather permits walk together through town to our dock where one of our boats will transfer you to Dolphin Blue Paradise.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">2. BUS WITH CARIBE SHUTTLES</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    A 10 hour bus ride from San José, CR to Almirante, Bocas Del Toro. When you arrive to Almirante take a $1 per person taxi to the Terpel Gas Station in Almirante Harbor where you will meet one of our Captains and be transported for a 40 minute ride to Dolphin Blue Paradise. Dolphin Blue Paradise will gladly help organize your transfer with Caribe Shuttles, depending on what timing suits your schedule best.
                  </p>
                </div>
              </div>
            </details>

            {/* From Puerto Viejo, Costa Rica */}
            <details className="group border border-black/10 rounded-lg overflow-hidden bg-white">
              <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-[var(--color-sand)] transition-colors">
                <h4 className="font-display text-xl text-[var(--color-navy)]">From Puerto Viejo, Costa Rica</h4>
                <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-sm text-[var(--color-text-primary)]">
                <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">BUS WITH CARIBE SHUTTLES</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  A 5 hour bus ride from your hotel in Puerto Viejo to Almirante, Bocas Del Toro. When you arrive to Almirante take a $1 per person taxi to the Terpel Gas Station in Almirante Harbor where you will meet one of our Captains and be transported for a 40 minute ride to Dolphin Blue Paradise. Dolphin Blue Paradise will gladly help organize your transfer with Caribe Shuttle, depending on what timing suits your schedule best.
                </p>
              </div>
            </details>

            {/* From David Airport */}
            <details className="group border border-black/10 rounded-lg overflow-hidden bg-white">
              <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-[var(--color-sand)] transition-colors">
                <h4 className="font-display text-xl text-[var(--color-navy)]">From David Airport</h4>
                <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 space-y-4 text-sm text-[var(--color-text-primary)]">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">1. PRIVATE CAR & DRIVER</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    The fastest and easiest way to get to us from David Airport. We can help organize a private car service in an air-conditioned 4x4. The car will take 2 passengers with suitcases or 4 passengers with handbags. Our Captain will meet you in Tierra Oscura and take you by boat to Dolphin Blue Paradise. The car ride is 3-4 hours depending on traffic and how many stops you make.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">2. RENTAL CAR</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We recommend that you drive to the village of Tierra Oscura from where we will pick you up by boat. The boat ride from Tierra Oscura is a short 10 minute ride. If you contact us we can send you a pin to where to meet us as well as information about parking options.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">3. PUBLIC BUS</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    David to Almirante $8-10. Ask to be dropped off at Valle De Aqua/Loma Estrella/New Tierra Oscura Road (about 2.5-3 hours). From here hail a red community taxi to Tierra Oscura Muelle Publico $0.65-$2 (15 minutes). We will meet you in Tierra Oscura. We ask that you let us know when you are in Rambala so we can time the pick up.
                  </p>
                </div>
              </div>
            </details>

            {/* From Boquete */}
            <details className="group border border-black/10 rounded-lg overflow-hidden bg-white">
              <summary className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-[var(--color-sand)] transition-colors">
                <h4 className="font-display text-xl text-[var(--color-navy)]">From Boquete</h4>
                <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 space-y-4 text-sm text-[var(--color-text-primary)]">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">1. PRIVATE CAR & DRIVER</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    The fastest and easiest way to get to us from Boquete. We can help organize a private car service in an air-conditioned 4x4. The car will take 2 passengers with suitcases or 4 passengers with handbags. Our Captain will meet you in Tierra Oscura and take you by boat to Dolphin Blue Paradise. The car ride is 3.5-4 hours depending on traffic and how many stops you make.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2">2. Public Bus</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    From Boquete to David $1.75 (1 hour. It leaves every 30 minutes from Boquete Central Park). Public Bus David to Almirante $8-10. Ask to be dropped off at Valle De Aqua/Loma Estrella/New Tierra Oscura Road (about 2.5-3 hours). From here hail a red community taxi to Tierra Oscura Muelle Publico $0.65-$2 (15 minutes). We will meet you in Tierra Oscura. We ask that you let us know when you are in Rambala so we can time the pick up.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2">3. Rental Car</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We recommend that you drive to the village of Tierra Oscura from where we will pick you up by boat. The boat ride from Tierra Oscura is a short 10 minute ride. If you contact us we can send you a pin to where to meet us as well as information about parking options.
                  </p>
                </div>
              </div>
            </details>
          </div>

          {/* Arrival in Bocas Del Toro */}
          <div className="mb-12">
            <Card className="p-6 bg-[var(--color-ocean)]/5 border-2 border-[var(--color-ocean)]/20">
              <h4 className="font-display text-xl text-[var(--color-navy)] mb-4 uppercase">ONCE YOU HAVE ARRIVED IN BOCAS DEL TORO</h4>
              <div className="space-y-4 text-sm text-[var(--color-text-primary)]">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">FREE TRANSFERS (4+ NIGHT STAYS)</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We offer free arrival and departure transfers from Virginia&apos;s dock in Bocas Town or from Bocas airport, for guests staying 4+ nights. For less than 4 nights, return transport will be charged at $90 for 2 people.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">SCHEDULED PICKUPS FROM BOCAS TOWN</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    We have 2 set Bocas Town pickups per day: departing from Muelle de Virginia at 12:30 pm and at 5 pm. On busy days we cannot pick up outside of these times. For safety reasons our latest pick up is always at 5 pm. If you request an extra pick up outside our set pickups we will charge you $50 for 2 people each way to cover gas, docking fee and Captain. Please let us know about your travel plans, and if you need a transfer as soon as possible. If the boat is full you will need to wait for the next pick up. If you arrive with the last Air Panama Flight we kindly ask that you either stay in town for the first night or that you organize your own taxi boat transfer. We can provide numbers of boat taxi services.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">PICKUP FROM ALMIRANTE</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    If you need a pick up in Almirante we can only offer to pick up either at Terpel Gas Station on the harbor or at Emilie&apos;s Secured Parking{" "}
                    <a href="https://maps.app.goo.gl/VLQArMMMjA3a7EB59" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ocean)] hover:underline">
                      (view location)
                    </a>.
                    {" "}The transfer fee in Almirante is $105 for up to 2 people (drop off and pick up).
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-2 uppercase">PICKUP FROM TIERRA OSCURA</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    If you come by car we can also offer you pick up in the Village of Tierra Oscura. You park with Ms. Leonora or Bianca against a small $5 donation to the local school per night. Return transfer to Tierra Oscura is $50 for up to 2 people.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Transfer Prices */}
          <div className="mb-12 text-center">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-4 uppercase">TRANSFER PRICES</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-2xl mx-auto">
              View our current transfer pricing and important information about boat services. Prices are updated regularly and may vary based on weather conditions and availability.
            </p>
            <TransferPricesButton />
          </div>

          {/* Packing List */}
          <div className="mb-8">
            <h3 className="font-display text-2xl text-[var(--color-navy)] mb-6 uppercase">RECOMMENDED PACKING LIST</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {packingList.map((category) => (
                <Card key={category.category} className="p-4">
                  <h4 className="font-semibold text-[var(--color-navy)] mb-3">{category.category}</h4>
                  <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Travel Times */}
          <Card className="p-6 bg-white/80 mb-8">
            <h3 className="font-display text-xl text-[var(--color-navy)] mb-4 uppercase">BEST TRAVEL TIMES BY SEASON</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--color-text-muted)]">
              <div>
                <p className="font-semibold text-[var(--color-navy)] mb-2">Dry Season (December - April)</p>
                <p>Best weather, ideal for all activities including surfing. Peak season - book early.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-navy)] mb-2">Green Season (May - November)</p>
                <p>Lush landscapes, fewer crowds, occasional rain. Great for nature enthusiasts.</p>
              </div>
            </div>
            {/* Note for Yuh: Please confirm the season dates and descriptions are accurate for your location */}
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-xs text-yellow-800 font-medium mb-1">📝 Note for Yuh:</p>
              <p className="text-xs text-yellow-700">
                Please confirm that the season dates (December - April for Dry Season, May - November for Green Season) and descriptions are accurate for your location in Bocas del Toro.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQs - Interactive Accordion */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-[var(--color-navy)] mb-4 text-center uppercase">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-center text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            FAQs appear directly on the Contact page to anticipate objections and answer questions immediately. By the time someone visits Contact, they&apos;re 70-80% decided—our job is to not give them a reason to leave.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-black/10 rounded overflow-hidden">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-[var(--color-sand)] transition-colors">
                  <span className="font-semibold text-[var(--color-navy)] pr-4">{faq.question}</span>
                  <span className="text-[var(--color-gold)] text-xl flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-[var(--color-text-muted)] bg-white">
                  <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">YUH: Please provide the following information:</p>
                  <ul className="space-y-2 mb-4">
                    {faq.answerItems?.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <FAQNotesEditor faqIndex={idx} initialNotes={faq.notes || ""} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FAQPage Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs
              .filter((faq) => faq.answerItems && faq.answerItems.length > 0)
              .map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answerItems.join(". "),
                },
              })),
          }),
        }}
      />

      {/* Concierge Support CTA */}
      <section className="section bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-forest)] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6 uppercase">NEED HELP PLANNING YOUR TRIP?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our concierge team coordinates every detail—from flights to boat transfers. Share your travel dates and we&apos;ll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="https://wa.me/50763460605"
              variant="secondary"
              className="bg-white text-[var(--color-ocean)] border-white hover:bg-white/90"
            >
              WhatsApp
            </Button>
            <Button
              href="mailto:contact@dolphinblueparadise.com"
              variant="secondary"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Email
            </Button>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
