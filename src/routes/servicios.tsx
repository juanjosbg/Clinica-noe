import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import {
  Heart, Stethoscope, Activity, Baby, Brain, Eye, Bone, Microscope,
  Pill, Scissors, Syringe, HeartPulse,
} from "lucide-react";

export const Route = createFileRoute("/servicios")({
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

const all = [
  { icon: Heart, title: "Cardiología", desc: "Diagnóstico y tratamiento integral del corazón." },
  { icon: Baby, title: "Pediatría", desc: "Cuidado especializado para los más pequeños." },
  { icon: Brain, title: "Neurología", desc: "Atención avanzada del sistema nervioso." },
  { icon: Bone, title: "Ortopedia", desc: "Recuperación funcional y traumatología." },
  { icon: Eye, title: "Oftalmología", desc: "Salud visual con equipos de última generación." },
  { icon: Microscope, title: "Laboratorio", desc: "Análisis clínicos precisos y oportunos." },
  { icon: Stethoscope, title: "Medicina interna", desc: "Atención integral del adulto." },
  { icon: Activity, title: "Urgencias 24/7", desc: "Respuesta inmediata cuando más lo necesitas." },
  { icon: Pill, title: "Farmacia", desc: "Medicamentos seguros y disponibles." },
  { icon: Scissors, title: "Cirugía", desc: "Procedimientos con altos estándares." },
  { icon: Syringe, title: "Vacunación", desc: "Esquemas completos para toda la familia." },
  { icon: HeartPulse, title: "Cuidado intensivo", desc: "UCI con monitoreo permanente." },
];

function Servicios() {
  const { ref, visible } = useReveal();
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Nuestras"
        accent="especialidades"
        description="Una amplia oferta médica respaldada por especialistas y tecnología de vanguardia."
      />
      <section ref={ref} className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {all.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`rounded-3xl bg-white p-7 shadow-soft hover-lift ${visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}