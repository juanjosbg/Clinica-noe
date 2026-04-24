import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { Target, Eye, Heart, Sparkles, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes somos — Clínica Noé" },
      { name: "description", content: "Conoce nuestra misión, visión y valores. Más de 25 años cuidando vidas con excelencia." },
      { property: "og:title", content: "Quiénes somos — Clínica Noé" },
      { property: "og:description", content: "Misión, visión y valores que guían nuestra atención médica." },
    ],
  }),
  component: QuienesSomos,
});

const values = [
  { icon: Heart, title: "Calidez humana", desc: "Trato cercano y empático en cada interacción." },
  { icon: ShieldCheck, title: "Seguridad", desc: "Protocolos estrictos para tu protección." },
  { icon: Sparkles, title: "Excelencia", desc: "Mejora continua en todos nuestros procesos." },
  { icon: Users, title: "Trabajo en equipo", desc: "Colaboración multidisciplinaria por tu bienestar." },
];

function QuienesSomos() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Una historia de"
        accent="cuidado y compromiso"
        description="Más de 25 años brindando atención médica integral con calidez humana, tecnología de vanguardia y un equipo comprometido con la vida."
      />

      <Intro />
      <MissionVision />
      <Values />
    </>
  );
}

function Intro() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-gradient-soft py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className={`inline-flex items-center gap-2 rounded-full bg-[#b4e3ed]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#267794] ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          Nuestra esencia
        </span>
        <h2 className={`mt-5 text-4xl md:text-5xl ${visible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
          Cuidamos lo que <span className="text-gradient-brand">más amas</span>
        </h2>
        <p className={`mt-6 text-lg leading-relaxed text-muted-foreground ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          Clínica Noé es una institución de salud privada comprometida con ofrecer una atención médica integral, segura y humanizada. Combinamos la experiencia de nuestros especialistas con tecnología de vanguardia para brindar la mejor experiencia a nuestros pacientes y sus familias.
        </p>
      </div>
    </section>
  );
}

function MissionVision() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
        {/* Mission */}
        <div className={`group relative overflow-hidden rounded-[2rem] bg-white p-10 shadow-soft hover-lift ${visible ? "animate-slide-in-left" : "opacity-0"}`}>
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#b4e3ed]/30 blur-2xl transition-all duration-700 group-hover:scale-125" />
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-brand">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-3xl">Misión</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Brindar atención médica integral, segura y humanizada a nuestros pacientes, mediante un equipo de profesionales altamente calificados y tecnología de vanguardia, contribuyendo al bienestar de la comunidad y al desarrollo de la salud.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className={`group relative overflow-hidden rounded-[2rem] bg-gradient-deep p-10 text-white shadow-brand hover-lift ${visible ? "animate-slide-in-right delay-200" : "opacity-0"}`}>
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#80cee0]/30 blur-2xl transition-all duration-700 group-hover:scale-125" />
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#267794] shadow-brand">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-3xl !text-white">Visión</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Ser reconocidos como la clínica líder en la región por la excelencia de nuestros servicios, la innovación tecnológica y la calidez humana en la atención, siendo referencia nacional en especialidades médicas y experiencia del paciente para el año 2030.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mx-auto max-w-2xl text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#b4e3ed]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#267794]">
            Valores
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl">
            Los principios que <span className="text-gradient-brand">nos guían</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`rounded-3xl bg-white p-8 text-center shadow-soft hover-lift ${visible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}