import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { institutionalDocuments } from "@/data/institutional";
import { Target, Eye, HandHeart, Scale, Users, Handshake, HeartHandshake, FileText, ArrowUpRight, BadgeCheck, Leaf, ShieldCheck } from "lucide-react";

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
      <Policies />
    </>
  );
}

function Policies() {
  const { ref, visible } = useReveal<HTMLElement>(0.08, { once: true });
  const icons = { calidad: BadgeCheck, ambiental: Leaf, seguridad: ShieldCheck };
  return (
    <section ref={ref} id="politicas" aria-labelledby="policies-title" className="relative isolate scroll-mt-44 overflow-hidden bg-[#f4f9fb] py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 -z-10 h-96 w-96 rounded-full bg-[#b4e3ed]/30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#267794]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><FileText aria-hidden="true" className="h-4 w-4" />Compromiso institucional</span>
          <h2 id="policies-title" className="mt-5 text-4xl md:text-5xl">Nuestras <span className="text-gradient-brand">políticas</span></h2>
          <p className="mt-5 leading-7 text-muted-foreground">Compromisos que guían nuestra forma de cuidar. Consulta los documentos que respaldan una atención segura, responsable y de calidad.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {institutionalDocuments.filter((document) => ["calidad", "ambiental", "seguridad"].includes(document.id)).map((document, index) => {
            const Icon = icons[document.id as keyof typeof icons];
            return (
            <div key={document.id} className={`motion-reduce:!opacity-100 motion-reduce:!animate-none ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${index * 130}ms` }}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce9ee] bg-white p-8 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#9fcbd8] hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
              <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${document.id === "ambiental" ? "bg-[#579572]" : document.id === "seguridad" ? "bg-[#7184b0]" : "bg-[#267794]"}`} />
              <div className="flex items-center justify-between">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transform-none ${document.id === "ambiental" ? "bg-[#eaf6ef] text-[#39765a]" : document.id === "seguridad" ? "bg-[#edf0fa] text-[#596c9c]" : "bg-[#e8f5fb] text-[#267794]"}`}><Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} /></div>
                <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Documento PDF</span>
              </div>
              <h3 className="mt-7 text-xl leading-snug sm:text-2xl">
                <a href={document.url!} target="_blank" rel="noopener noreferrer" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {document.title}<span className="sr-only"> (PDF, otra pestaña)</span>
                </a>
              </h3>
              <p className="mb-8 mt-3 text-sm leading-7 text-muted-foreground">{document.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5 text-sm font-medium text-primary">
                <a href={document.url!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#0e3a4d] px-5 py-3 text-white transition-colors hover:bg-[#267794] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Consultar PDF<ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (otra pestaña)</span></a>
              </div>
            </article>
            </div>
          ); })}
        </div>
      </div>
    </section>
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
