import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Clínica Noé` },
          { name: "description", content: loaderData.service.summary },
          { property: "og:title", content: `${loaderData.service.title} — Clínica Noé` },
          { property: "og:description", content: loaderData.service.summary },
        ]
      : [{ title: "Servicio — Clínica Noé" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-4xl">Servicio no encontrado</h1>
      <Link to="/servicios" className="mt-6 inline-block text-[#267794] underline">
        Volver a servicios
      </Link>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const intro = useReveal();
  const list = useReveal(0.1);
  const related = useReveal(0.1);

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title.split(" ").slice(0, -1).join(" ")}
        accent={service.title.split(" ").slice(-1)[0]}
        description={service.summary}
      />

      <section ref={intro.ref} className="bg-background py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className={intro.visible ? "animate-slide-in-left" : "opacity-0"}>
            <div className="sticky top-28 rounded-[2rem] bg-gradient-brand p-10 text-white shadow-brand">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Icon className="h-8 w-8" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {service.category}
              </p>
              <h2 className="mt-2 text-3xl !text-white">{service.title}</h2>
              <Link
                to="/servicios"
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-5 py-2.5 text-xs font-semibold transition-all hover:bg-white hover:text-[#267794]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Todos los servicios
              </Link>
            </div>
          </div>

          <div className={intro.visible ? "animate-slide-in-right delay-200" : "opacity-0"}>
            <p className="text-lg leading-relaxed text-muted-foreground">{service.description}</p>

            {service.infrastructure && (
              <div ref={list.ref} className="mt-12">
                <h3 className="text-2xl text-[#267794]">{service.infrastructureTitle}</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.infrastructure.map((item, i) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft hover-lift ${
                        list.visible ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#267794]" />
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.specialties && (
              <div ref={list.ref} className="mt-12">
                <h3 className="text-2xl text-[#267794]">{service.specialtiesTitle}</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.specialties.map((item, i) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft hover-lift ${
                        list.visible ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#267794]" />
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section ref={related.ref} className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className={`text-3xl md:text-4xl ${related.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            Otros <span className="text-gradient-brand">servicios</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => {
              const OIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className={`group rounded-3xl bg-white p-7 shadow-soft hover-lift ${
                    related.visible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                    <OIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl">{s.shortTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}