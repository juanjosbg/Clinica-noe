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
            {service.slug === "consulta-externa" && (
              <>
                <section className="mt-9">
                  <h2 className="text-xl text-primary sm:text-2xl">Direcci?n, l?neas de atenci?n y horarios</h2>
                  <div className="mt-5 space-y-4 rounded-2xl bg-[#f2f8fa] p-5 text-sm leading-7">
                    <p><strong>Direcci?n:</strong> Calle 38 n.? 11-73, avenida 30 de Agosto, diagonal a Telemark.</p>
                    <p><strong>Celular:</strong> <a href="tel:+573009145181" className="text-primary underline">300 914 5181</a><br /><strong>Tel?fono fijo:</strong> <a href="tel:+576023865000" className="text-primary underline">(602) 386 5000</a><br /><strong>L?nea exclusiva de WhatsApp:</strong> <a href="https://wa.me/573166425093" className="text-primary underline">316 642 5093</a></p>
                    <p><strong>Horarios:</strong><br />Lunes a jueves: 7:00 a. m. a 5:00 p. m.<br />Viernes: 7:00 a. m. a 4:00 p. m.</p>
                  </div>
                </section>
                <section className="mt-9">
                  <h2 className="text-xl text-primary sm:text-2xl">Recomendaciones para Consulta Externa</h2>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">Traiga su orden m?dica. Si viene remitido por una entidad, presente la orden m?dica y la autorizaci?n correspondiente.</p>
                </section>
                <section className="mt-9">
                  <h2 className="text-xl text-primary sm:text-2xl">Terapia f?sica y rehabilitaci?n</h2>
                  <h3 className="mt-5 text-lg font-semibold text-primary">Recomendaciones generales ? Servicio de Fisioterapia</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Estimado(a) usuario(a), para garantizar el adecuado desarrollo de sus sesiones de fisioterapia, tenga en cuenta las siguientes recomendaciones:</p>
                  <ol className="mt-5 list-decimal space-y-4 pl-6 text-sm leading-7 text-muted-foreground">
                    <li><strong>Puntualidad:</strong> llegue de 10 a 15 minutos antes de la hora programada.</li>
                    <li><strong>Vestuario:</strong> utilice ropa c?moda y calzado adecuado que facilite la realizaci?n de los ejercicios.</li>
                    <li><strong>Elementos personales:</strong> traiga una toalla peque?a de uso personal.</li>
                    <li><strong>Hidrataci?n:</strong> mantenga una adecuada hidrataci?n antes, durante y despu?s de la sesi?n de fisioterapia.</li>
                    <li><strong>Documentaci?n:</strong> presente su documento de identidad y la orden m?dica. Si viene remitido por una entidad, traiga tambi?n la autorizaci?n correspondiente.</li>
                    <li><strong>Estado de salud:</strong> informe al fisioterapeuta sobre cualquier dolor, molestia o cambio en su estado de salud antes de iniciar la sesi?n.</li>
                    <li><strong>Alimentaci?n:</strong> evite asistir en ayunas o inmediatamente despu?s de consumir comidas abundantes.</li>
                    <li><strong>Acompa?amiento:</strong> asista con un acompa?ante si presenta dificultades para la movilidad o requiere ayuda durante los desplazamientos.</li>
                  </ol>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">Su compromiso y asistencia son fundamentales para el ?xito de su proceso de rehabilitaci?n. ?Gracias por su colaboraci?n!</p>
                </section>
              </>
            )}
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
