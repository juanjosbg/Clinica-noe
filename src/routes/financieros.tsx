import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";

const financialStatementUrl = "/EstadosFinancieros/ORIGINAL EF 2025 CNOE.pdf";

export const Route = createFileRoute("/financieros")({
  head: () => ({
    meta: [
      { title: "Estados Financieros — Clínica Noé" },
      {
        name: "description",
        content: "Consulta los estados financieros de Clínica Noé.",
      },
      { property: "og:title", content: "Estados Financieros — Clínica Noé" },
      {
        property: "og:description",
        content: "Estados financieros institucionales disponibles para consulta.",
      },
    ],
  }),
  component: Financieros,
});

function Financieros() {
  const reports = [
    {
      title: "Estados Financieros 2025",
      description: "Consulta el informe financiero institucional 2025.",
      href: financialStatementUrl,
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
            Estados Financieros
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            Accede a los documentos financieros institucionales disponibles.
          </p>
        </div>
      </section>

      <section className="bg-gradient-soft py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid max-w-[346px] gap-8 md:grid-cols-1">
            {reports.map((report) => (
              <a
                key={report.title}
                href={report.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-[#b4e3ed]/45 transition-all hover:-translate-y-1 hover:shadow-brand"
              >
                <div className="relative h-[270px] overflow-hidden bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0e3a4d] via-[#267794] to-[#80cee0]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.3),transparent_32%)]" />
                  <div className="relative flex h-full flex-col justify-between p-8 text-white">
                    <div className="flex justify-end">
                      <img src="/Logo/Noe-Blanco.png" alt="Clínica Noé" className="h-14 w-auto" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b4e3ed]">
                        Informe institucional
                      </p>
                      <h2 className="mt-3 text-3xl font-bold leading-tight text-white!">
                        Estados Financieros 2025
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#b4e3ed]/45 text-[#267794]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#0e3a4d]">
                    {report.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {report.description}
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
