import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Clínica Noé" },
      { name: "description", content: "Conoce todas nuestras especialidades médicas y servicios de salud." },
      { property: "og:title", content: "Servicios — Clínica Noé" },
      { property: "og:description", content: "Más de 30 especialidades médicas con tecnología de vanguardia." },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  const { ref } = useReveal();
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Nuestros"
        accent="servicios"
        description="Una amplia oferta médica respaldada por especialistas y tecnología de vanguardia."
      />
      <section ref={ref} className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
    </>
  );
}
