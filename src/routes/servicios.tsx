import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

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
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className={`group relative overflow-hidden rounded-3xl bg-white p-7 shadow-soft hover-lift ${
                    visible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#b4e3ed]/0 transition-all duration-500 group-hover:bg-[#b4e3ed]/40" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-[#b4e3ed]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#267794]">
                    {s.category}
                  </span>
                  <div className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative mt-5 text-xl">{s.shortTitle}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{s.summary}</p>
                  <div className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#267794] opacity-0 transition-opacity group-hover:opacity-100">
                    Ver detalle <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}