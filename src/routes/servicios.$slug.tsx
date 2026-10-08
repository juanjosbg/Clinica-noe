import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { getService, services } from "@/data/services";
import { ImagingPatientGuide } from "@/components/ImagingPatientGuide";

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${getService(loaderData.slug)!.title} — Clínica Noé` },
          { name: "description", content: getService(loaderData.slug)!.summary },
          { property: "og:title", content: `${getService(loaderData.slug)!.title} — Clínica Noé` },
          { property: "og:description", content: getService(loaderData.slug)!.summary },
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
  const { slug } = Route.useParams();
  const service = getService(slug)!;
  const sections = [
    { title: "Nuestro servicio", items: service.highlights },
    { title: service.infrastructureTitle, items: service.infrastructure },
    { title: service.specialtiesTitle, items: service.specialties },
  ];
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#0e3a4d] pb-24 pt-36 md:pt-44">
        <img src={aboutHero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0e3a4d]/95 to-[#0e3a4d]/80" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#80cee0]">Nuestros servicios</p>
          <h1 className="mt-5 break-words text-3xl !text-white sm:text-4xl lg:text-5xl">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">{service.summary}</p>
        </div>
      </section>
      <section className="bg-[#f2f8fa] pb-20">
        <div className="relative -mt-11 mx-auto grid max-w-6xl items-start gap-7 px-6 lg:grid-cols-[minmax(0,3fr)_minmax(250px,1fr)]">
          <article className="min-w-0 rounded-[1.75rem] border border-border/50 bg-white p-6 shadow-brand sm:p-9">
            <Link to="/servicios" className="inline-flex items-center gap-2 rounded text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Todos los servicios
            </Link>
            <h2 className="mt-8 text-2xl text-primary sm:text-3xl">Acerca del servicio</h2>
            <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-base">{service.description}</p>
            {sections.filter((section) => section.items?.length && !(service.slug === "imagenes-diagnosticas" && section.title === "Nuestro servicio")).map((section) => (
              <section key={section.title} className="mt-9">
                <h2 className="text-xl text-primary sm:text-2xl">{section.title}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.items!.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl bg-[#f2f8fa] p-5 text-sm leading-7">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {service.slug === "imagenes-diagnosticas" && <ImagingPatientGuide />}
          </article>
          <aside className="rounded-2xl border border-border/50 bg-white p-6 shadow-brand lg:sticky lg:top-28">
            <h2 id="service-navigation" className="text-lg text-primary">Nuestros servicios</h2>
            <nav aria-labelledby="service-navigation" className="mt-5 space-y-2">
              {services.map((item) => (
                <Link key={item.slug} to="/servicios/$slug" params={{ slug: item.slug }}
                  aria-current={item.slug === service.slug ? "page" : undefined}
                  className={"flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary " + (item.slug === service.slug ? "bg-[#e4f3f8] font-semibold text-primary" : "text-muted-foreground hover:bg-[#f2f8fa] hover:text-primary")}>
                  {item.shortTitle}<ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
