import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Globe, Plane, Hotel, Languages } from "lucide-react";

export const Route = createFileRoute("/internacional")({
  head: () => ({
    meta: [
      { title: "Oficina Internacional — Clínica Noé" },
      { name: "description", content: "Atención especializada para pacientes internacionales." },
      { property: "og:title", content: "Oficina Internacional — Clínica Noé" },
      { property: "og:description", content: "Coordinamos tu atención médica en Colombia." },
    ],
  }),
  component: Internacional,
});

const services = [
  { icon: Globe, title: "Atención global", desc: "Pacientes de todo el mundo." },
  { icon: Plane, title: "Logística de viaje", desc: "Asistencia desde tu llegada." },
  { icon: Hotel, title: "Alojamiento", desc: "Convenios con hoteles cercanos." },
  { icon: Languages, title: "Idiomas", desc: "Atención en español, inglés y portugués." },
];

function Internacional() {
  return (
    <>
      <PageHero
        eyebrow="Oficina Internacional"
        title="Tu salud,"
        accent="sin fronteras"
        description="Coordinamos cada detalle de tu experiencia médica en Colombia con altos estándares de calidad."
      />
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-3xl bg-white p-7 text-center shadow-soft hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}