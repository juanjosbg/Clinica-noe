import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Calendar, FileText, CreditCard, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/atencion")({
  head: () => ({
    meta: [
      { title: "Atención al paciente — Clínica Noé" },
      { name: "description", content: "Información útil para tu visita: agenda, resultados, pagos y orientación." },
      { property: "og:title", content: "Atención al paciente — Clínica Noé" },
      { property: "og:description", content: "Te acompañamos en cada paso de tu experiencia." },
    ],
  }),
  component: Atencion,
});

const items = [
  { icon: Calendar, title: "Agenda tu cita", desc: "Programa tu consulta con el especialista que necesitas." },
  { icon: FileText, title: "Portal de resultados", desc: "Consulta y descarga tus exámenes en línea." },
  { icon: CreditCard, title: "Medios de pago", desc: "Conoce las opciones disponibles para tus servicios." },
  { icon: Phone, title: "Línea 24/7", desc: "Comunícate con nosotros en cualquier momento." },
  { icon: MapPin, title: "Cómo llegar", desc: "Direcciones y rutas hacia nuestras sedes." },
  { icon: Clock, title: "Horarios", desc: "Conoce los horarios de cada servicio." },
];

function Atencion() {
  return (
    <>
      <PageHero
        eyebrow="Atención al paciente"
        title="Estamos aquí"
        accent="para acompañarte"
        description="Toda la información que necesitas para vivir una experiencia tranquila y segura en Clínica Noé."
      />
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-3xl bg-white p-7 shadow-soft hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Icon className="h-7 w-7" />
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