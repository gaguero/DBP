import Image from "next/image";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

const introParagraphs = [
  "Encontrar un destino que se alinee con tus valores puede resultar desalentador.",
  "Necesitas un lugar que combine comodidad, experiencias personalizadas y sostenibilidad sin comprometer tus principios.",
  "Dolphin Blue Paradise esta aqui. Ofrecemos estancias totalmente personalizadas con cocina de la huerta, excursiones a medida y un compromiso permanente con la sustentabilidad. Nos encargamos de cada detalle del viaje, desde los vuelos hasta el ultimo trayecto en lancha, operamos con energia solar, utilizamos materiales ecologicos y abastecemos nuestra cocina con productos locales.",
  "Sumergente en uno de los entornos con mayor biodiversidad del planeta y observa como tu visita apoya al entorno natural y a las comunidades cercanas mediante nuestras practicas sostenibles, servicio atento, itinerarios a medida y atencion especial a las dietas." 
];

const locationParagraph =
  "Dolphin Blue Paradise es un eco-resort de lujo 100% fuera de la red ubicado en Isla San Cristobal, Bahia Delfines. Alrededor se encuentran plantaciones, fincas y las comunidades indigenas de Bocastorito y Aldana, hogar del pueblo Ngabe y Guayami. Un bosque primario nos rodea y alrededor de 80 delfines nariz de botella residen en la bahia durante todo el ano.";

const amenities = [
  {
    title: "Desayuno",
    description:
      "Comienza el dia con fruta fresca del jardin, jugos, huevos de la zona, pan casero y mermeladas.",
  },
  {
    title: "Wi-Fi gratuito",
    description: "Internet de alta velocidad disponible en toda la propiedad sin costo adicional.",
  },
  {
    title: "Jardin tropical",
    description:
      "Recorre cinco hectareas de jardines tropicales cuidados por Roque y su equipo, repletos de frutas y vida silvestre.",
  },
  {
    title: "Vista al mar",
    description:
      "Nada en aguas cristalinas desde nuestra plataforma y observa la vida marina directamente desde tu terraza.",
  },
  {
    title: "Bosque primario",
    description:
      "Organizamos caminatas por el bosque para avistar perezosos, monos, aves y arboles de cacao." ,
  },
  {
    title: "Blo Bar & Restaurant",
    description:
      "Disfruta de nuestro restaurante sobre el agua con vistas a la bahia y menus inspirados en nuestro jardin.",
  },
];

const activities = [
  { title: "Bahia de los Delfines", description: "Observa a los delfines residentes en su habitat natural." },
  { title: "Snorkel", description: "Sumergente en aguas caribenias desde la plataforma o en excursiones guiadas." },
  { title: "Excursiones y tours", description: "Descubre playas escondidas y comunidades de Bocas del Toro en lancha." },
  { title: "Esqui y wakeboard", description: "Agrega adrenalina con sesiones de esqui acuatico, wakeboard o tubing." },
  { title: "Tour de cacao", description: "Visita a una comunidad Ngabe o a nuestros vecinos chocolateros para conocer el proceso del cacao." },
  { title: "Paddle surf", description: "Explora la bahia a tu ritmo con tablas de paddle incluidas." },
  { title: "Surf", description: "De noviembre a abril coordinamos paquetes de surf en playas de clase mundial." },
  { title: "Kayak", description: "Recorre los manglares con kayaks disponibles durante toda la estancia." },
  { title: "Isla de los monos", description: "Visita un santuario para monos huerfanos y conoce su proceso de rehabilitacion." },
  { title: "Pesca", description: "Pesca todo el ano especies como pargo, jack, wahoo o atun." },
  { title: "Masajes", description: "Relajate con masajes terapeuticos organizados en el resort." },
];

const testimonial = {
  quote:
    "Hemos viajado a mas de 50 paises y Dolphin Blue Paradise es uno de los lugares mas impresionantes y hospitalarios que hemos visitado.",
  author: "Huesped reciente",
};

const disclaimer =
  "Dolphin Blue Paradise no se hace responsable por las pertenencias de los huespedes. Aunque Bahia Delfines es un lugar muy seguro, recomendamos resguardar los objetos de valor cuando salgas de la habitacion.";

export default function HogarPage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src="/images/hero-bay.jpg"
          alt="Vista aerea de Bahia Delfines"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative container flex min-h-[80vh] flex-col justify-center gap-8 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">Paraiso entre la selva y el mar</p>
          <h1 className="max-w-3xl font-display text-4xl md:text-6xl">Un refugio eco-lujo personalizado</h1>
          <p className="max-w-2xl text-lg text-white/80">
            Disenamos cada estancia segun tus valores con comodidad fuera de la red, experiencias curadas y practicas regenerativas en Bahia Delfines, Panama.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#booking" trackingEvent="es_cta_plan_escape" trackingData={{ section: "hero" }}>
              Planificar escapada
            </Button>
            <Button
              href="/es/experiencias"
              variant="secondary"
              trackingEvent="es_cta_explore_experiences"
              trackingData={{ section: "hero" }}
            >
              Explorar experiencias
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted text-lg leading-8">
              {paragraph}
            </p>
          ))}
          <p className="text-muted text-lg leading-8">{locationParagraph}</p>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-8">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Comodidades y espacios destacados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <Card key={amenity.title} className="space-y-3">
                <h3 className="font-display text-xl text-[var(--color-navy)]">{amenity.title}</h3>
                <p className="text-sm text-muted">{amenity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-8">
          <h2 className="font-display text-3xl text-[var(--color-navy)]">Actividades</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.title} className="space-y-2 p-6">
                <h3 className="font-display text-lg text-[var(--color-navy)]">{activity.title}</h3>
                <p className="text-sm text-muted">{activity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-sand)]">
        <div className="container space-y-6">
          <blockquote className="rounded-3xl bg-white/80 p-8 text-lg italic text-[var(--color-navy)] shadow-soft">
            <p>{testimonial.quote}</p>
          </blockquote>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">{testimonial.author}</p>
        </div>
      </section>

      <section className="section">
        <div className="container text-sm text-muted">
          <p>{disclaimer}</p>
        </div>
      </section>

      <BookingWidgetPlaceholder />
    </div>
  );
}

