import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { Target, Eye, HandHeart, Scale, Users, Handshake, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes somos — Clínica Noé" },
      { name: "description", content: "Direccionamiento estratégico de Clínica Noé: misión, visión y valores corporativos." },
      { property: "og:title", content: "Quiénes somos — Clínica Noé" },
      { property: "og:description", content: "Misión, visión y valores corporativos que guían nuestra atención médica." },
    ],
  }),
  component: QuienesSomos,
});

const values = [
  { icon: Users, title: "Solidaridad", desc: "Apoyamos a nuestros pacientes y colaboradores con sentido humano." },
  { icon: Scale, title: "Integridad", desc: "Actuamos con coherencia, ética y transparencia en cada acción." },
  { icon: Handshake, title: "Respeto", desc: "Reconocemos la dignidad y los derechos de cada persona." },
  { icon: HeartHandshake, title: "Compromiso", desc: "Trabajamos cada día por el bienestar y la confianza de quienes nos eligen." },
  { icon: HandHeart, title: "Vocación de Servicio", desc: "Servimos con entrega, calidez y empatía a nuestros pacientes." },
];

function QuienesSomos() {
  return (
    <>
      <PageHero
        eyebrow="Direccionamiento estratégico"
        title="Quiénes"
        accent="somos"
        description="Conoce el direccionamiento estratégico que guía a Clínica Noé: nuestra misión, visión y valores corporativos."
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
          Una atención <span className="text-gradient-brand">humanizada</span> de mediana y alta complejidad
        </h2>
        <p className={`mt-6 text-lg leading-relaxed text-muted-foreground ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          Clínica Noé es una institución de salud comprometida con la prestación de servicios de mediana y alta complejidad, enfocada en el mejoramiento continuo y en construir relaciones de confianza con nuestros clientes y pacientes.
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
            <h3 className="mt-6 text-3xl">Nuestra Misión</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Brindar servicios de salud de mediana y alta complejidad con una atención humanizada, segura y oportuna, enfocados al mejoramiento continuo para así crear relaciones de confianza con nuestros clientes y pacientes.
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
            <h3 className="mt-6 text-3xl !text-white">Nuestra Visión</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Nos proyectamos para el 2030 como una institución líder a nivel regional en la prestación de servicios de salud de alta complejidad promoviendo un trato humanizado con los más altos estándares de calidad.
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
            Valores corporativos
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl">
            Los principios que <span className="text-gradient-brand">nos guían</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cinco valores que definen nuestra cultura y nuestra forma de cuidar a quienes confían en nosotros.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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