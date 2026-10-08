import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { ArrowRight, Mail, Phone, Search, X } from "lucide-react";
import { services } from "@/data/services";

const pages = [
  { title: "Inicio", description: "Clínica Noé", to: "/" as const },
  { title: "Quiénes somos", description: "Nuestra institución", to: "/quienes-somos" as const },
  { title: "Atención al paciente", description: "Contacto, citas y orientación", to: "/atencion" as const },
  { title: "Servicios", description: "Todas nuestras especialidades", to: "/servicios" as const },
];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const resultClass = "flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#80cee0]";

export function HeaderActions({ scrolled }: { scrolled: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const term = normalize(query.trim());
  const matchingPages = term ? pages.filter((page) => normalize(`${page.title} ${page.description}`).includes(term)) : [];
  const matchingServices = term ? services.filter((service) => normalize(`${service.title} ${service.summary} ${service.highlights.join(" ")} ${service.specialties?.join(" ") ?? ""}`).includes(term)) : [];
  const showResults = term.length > 0;

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-4">
      <Dialog.Root open={searchOpen} onOpenChange={(value) => { setSearchOpen(value); if (!value) setQuery(""); }}>
        <Dialog.Trigger asChild>
          <button type="button" aria-label="Buscar en el sitio" className={`rounded-full p-2 transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary ${scrolled ? "text-primary" : "text-white"}`}><Search aria-hidden="true" className="h-5 w-5" /></button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#03172e]/80 backdrop-blur-md" />
          <Dialog.Content className="fixed inset-0 z-[61] flex flex-col justify-center overflow-y-auto px-5 py-20 outline-none">
            <Dialog.Close className="fixed right-5 top-5 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white sm:right-9 sm:top-7"><X aria-hidden="true" className="h-5 w-5" /><span className="sr-only">Cerrar buscador</span></Dialog.Close>
            <div className="mx-auto w-full max-w-2xl">
              <Dialog.Title className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] !text-[#80cee0]">¿Qué estás buscando?</Dialog.Title>
              <Dialog.Description className="sr-only">Busca servicios, reportes, citas o información de la clínica.</Dialog.Description>
              <form role="search" onSubmit={(event) => { event.preventDefault(); }} className="flex overflow-hidden rounded-full bg-white shadow-brand focus-within:ring-2 focus-within:ring-[#80cee0]">
                <label htmlFor="site-search" className="sr-only">Buscar en Clínica Noé</label>
                <input id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar servicios, resultados, contacto..." className="min-w-0 flex-1 bg-transparent px-5 py-5 text-sm text-foreground outline-none sm:px-6" />
                <button type="submit" aria-label="Buscar" className="bg-primary px-6 text-white transition hover:bg-primary/90"><Search aria-hidden="true" className="h-6 w-6" /></button>
              </form>
              {showResults && (
                <div className="mt-5 max-h-[45vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0e3a4d]/90 p-3">
                  <p role="status" className="px-4 py-2 text-xs text-white/70">{matchingPages.length + matchingServices.length + (normalize("resultados reportes imagenes portal").includes(term) ? 1 : 0)} resultados</p>
                  {matchingPages.map((page) => <Link key={page.to} to={page.to} onClick={() => setSearchOpen(false)} className={resultClass}><span>{page.title}<span className="mt-1 block text-xs text-white/60">{page.description}</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}
                  {matchingServices.map((service) => <Link key={service.slug} to="/servicios/$slug" params={{ slug: service.slug }} onClick={() => setSearchOpen(false)} className={resultClass}><span>{service.shortTitle}<span className="mt-1 block text-xs text-white/60">Servicio médico</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}
                  {normalize("resultados reportes imagenes portal").includes(term) && <a href="https://clinicacolombiaes.imexhs.com/portal/login" target="_blank" rel="noopener noreferrer" className={resultClass}><span>Consultar reportes e imágenes<span className="mt-1 block text-xs text-white/60">Portal de resultados · abre en otra pestaña</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>}
                  {matchingPages.length === 0 && matchingServices.length === 0 && !normalize("resultados reportes imagenes portal").includes(term) && <p className="px-4 py-3 text-sm leading-7 text-white/80">No encontramos coincidencias. Prueba con otro término o busca “contacto” para recibir orientación.</p>}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Popover.Root>
        <Popover.Trigger asChild><button type="button" className="rounded-full bg-primary px-4 py-3 text-xs font-semibold text-white shadow-soft transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-5 sm:text-sm">Agendar cita</button></Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="end" sideOffset={16} collisionPadding={12} aria-labelledby="appointment-title" className="z-[55] w-[352px] max-w-[calc(100vw-24px)] overflow-y-auto rounded-2xl border border-border bg-white shadow-brand outline-none max-h-[var(--radix-popover-content-available-height)]">
            <div className="relative bg-[#0e3a4d] px-6 py-5 pr-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80cee0]">Clínica Noé</p>
              <h2 id="appointment-title" className="mt-1 text-lg !text-white">Nuestros canales de atención</h2>
              <Popover.Close aria-label="Cerrar canales de atención" className="absolute right-4 top-5 rounded p-1 text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><X aria-hidden="true" className="h-4 w-4" /></Popover.Close>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-[#e4f3f8] p-2.5 text-primary"><Phone aria-hidden="true" className="h-4 w-4" /></span>
                <div><h3 className="text-sm font-semibold">Línea telefónica</h3><a href="tel:+576063865320" className="mt-1 block text-sm text-muted-foreground hover:text-primary hover:underline">PBX (606) 386 5320</a></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-[#e4f3f8] p-2.5 text-primary"><Mail aria-hidden="true" className="h-4 w-4" /></span>
                <div className="min-w-0"><h3 className="text-sm font-semibold">Atención al paciente</h3><a href="mailto:coor.siau@clinicanoe.com.co" className="mt-1 block break-all text-sm text-muted-foreground hover:text-primary hover:underline">coor.siau@clinicanoe.com.co</a></div>
              </div>
              <p className="rounded-2xl bg-[#f2f8fa] p-4 text-xs leading-6 text-muted-foreground">Comunícate con nuestros canales para solicitar una cita y confirmar la disponibilidad y los horarios de atención.</p>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
