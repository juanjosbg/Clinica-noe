import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";

const portfolioUrl = "/Portafolios/PORTAFOLIO-NOE-2026.pdf";

export const Route = createFileRoute("/portafolios")({
  head: () => ({
    meta: [
      { title: "Portafolios — Clínica Noé" },
      {
        name: "description",
        content: "Consulta el portafolio institucional de Clínica Noé.",
      },
      { property: "og:title", content: "Portafolios — Clínica Noé" },
      {
        property: "og:description",
        content: "Conoce nuestra oferta institucional y servicios de salud.",
      },
    ],
  }),
  component: Portafolios,
});

function Portafolios() {
  const portfolios = [
    {
      title: "Portafolio Noé 2026",
      description: "Conoce nuestro portafolio de servicios 2026.",
      href: portfolioUrl,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#12346f] pt-36 pb-28 text-white">
        <div className="absolute inset-0 bg-linear-to-r from-[#12346f] via-[#12346f] to-[#267794]/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#b4e3ed]">
            Consulte nuestros
          </p>
          <h1 className="mt-4 text-5xl font-bold uppercase text-white! md:text-6xl">
            Portafolios
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            Conoce nuestra oferta institucional y entérate de nuestras novedades.
          </p>
        </div>
      </section>

      <section className="bg-gradient-soft py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid max-w-86.5 gap-8 md:grid-cols-1">
            {portfolios.map((portfolio) => (
              <a
                key={portfolio.title}
                href={portfolio.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-[#b4e3ed]/45 transition-all hover:-translate-y-1 hover:shadow-brand"
              >
                <div className="relative h-87.5 overflow-hidden bg-white">
                  <iframe
                    src={`${portfolio.href}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
                    title={`Portada de ${portfolio.title}`}
                    className="pointer-events-none absolute -left-2 -top-2 h-150 w-[calc(100%+40px)] border-0"
                    tabIndex={-1}
                  />
                  <div className="pointer-events-none absolute -right-5 top-0 h-full w-4 bg-white" />
                </div>

                <div className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#b4e3ed]/45 text-[#267794]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#0e3a4d]">
                    {portfolio.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {portfolio.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#267794] transition-colors group-hover:text-[#0e3a4d]">
                    Leer más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
