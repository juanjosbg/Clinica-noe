import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, FileHeart, Handshake, MapPin, MessageCircle, ScanLine, ShieldCheck, Users } from "lucide-react";
import { InstitutionalSearch } from "@/components/InstitutionalSearch";
import { institutionalSections } from "@/data/institutional";

const icons = [ShieldCheck, ScanLine, MapPin, Handshake, FileHeart, BriefcaseBusiness, Users, MessageCircle, FileHeart];
const controlClass = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition hover:border-primary hover:bg-[#edf7fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function InstitutionalCarousel({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectPreference = () => setReducedMotion(preference.matches);
    respectPreference();
    preference.addEventListener("change", respectPreference);
    return () => preference.removeEventListener("change", respectPreference);
  }, []);

  useEffect(() => {
    if (!api) return;
    const updatePosition = () => setPosition(api.selectedScrollSnap());
    const startDrag = () => setInteracting(true);
    const endDrag = () => setInteracting(false);
    updatePosition();
    api.on("select", updatePosition);
    api.on("reInit", updatePosition);
    api.on("pointerDown", startDrag);
    api.on("pointerUp", endDrag);
    return () => { api.off("select", updatePosition); api.off("reInit", updatePosition); api.off("pointerDown", startDrag); api.off("pointerUp", endDrag); };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const index = institutionalSections.findIndex((item) => item.id === activeId);
    if (index >= 0) api.scrollTo(index);
  }, [api, activeId]);

  useEffect(() => {
    if (!api || reducedMotion || searchOpen || interacting) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [api, reducedMotion, searchOpen, interacting]);

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Temas de información institucional"
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest('[role="dialog"]')) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (event.key === "ArrowLeft") api?.scrollPrev(); else api?.scrollNext();
        }
      }}
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Explora la Clínica</p><h2 className="mt-2 text-2xl sm:text-3xl">¿Qué quieres conocer?</h2><p className="mt-2 text-sm text-muted-foreground">Desliza y selecciona un tema para ver su información.</p></div>
        <div className="flex items-center gap-2">
          <InstitutionalSearch onSelect={onSelect} onOpenChange={setSearchOpen} triggerClass={controlClass} />
          <button type="button" aria-label="Tarjeta anterior" onClick={() => api?.scrollPrev()} className={controlClass}><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
          <button type="button" aria-label="Tarjeta siguiente" onClick={() => api?.scrollNext()} className={controlClass}><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
        </div>
      </div>
      <div ref={viewportRef} className="overflow-hidden rounded-3xl">
        <div className="-ml-5 flex touch-pan-y">
          {institutionalSections.map((item, index) => {
            const Icon = icons[index];
            const selected = activeId === item.id;
            return (
              <div key={item.id} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${institutionalSections.length}`} className="min-w-0 shrink-0 grow-0 basis-[86%] pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <button
                  type="button"
                  id={`topic-${item.id}`}
                  aria-pressed={selected}
                  aria-controls={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`group relative flex h-[300px] w-full flex-col overflow-hidden rounded-3xl p-7 text-left transition duration-300 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#80cee0] ${selected ? "bg-[#155b73] ring-2 ring-inset ring-[#80cee0]" : "bg-[#0e3a4d] hover:bg-[#164e63]"}`}
                >
                  <span className="max-w-[220px] text-2xl font-semibold leading-tight tracking-tight text-white">{item.title}</span>
                  <span className="my-auto self-center rounded-full bg-white/5 p-5 text-[#80cee0] transition duration-300 group-hover:scale-110"><Icon aria-hidden="true" className="h-16 w-16" strokeWidth={1.2} /></span>
                  <span className="max-w-[80%] pr-2 text-xs leading-5 text-white/65">{item.description}</span>
                  <span className="absolute bottom-0 right-0 rounded-tl-[26px] bg-[#f8fafb] pl-3 pt-3"><span className={`flex h-11 w-11 items-center justify-center rounded-full ${selected ? "bg-[#267794] text-white" : "bg-[#e4f3f8] text-primary"}`}><ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span></span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" aria-label="Posición del carrusel">
          {institutionalSections.map((item, index) => <button key={item.id} type="button" aria-label={`Mostrar tarjeta ${index + 1}: ${item.title}`} aria-current={position === index ? "true" : undefined} onClick={() => api?.scrollTo(index)} className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary"><span className={`h-1.5 rounded-full transition-all ${position === index ? "w-6 bg-primary" : "w-1.5 bg-slate-300"}`} /></button>)}
        </div>
        <span className="text-xs text-muted-foreground">{String(position + 1).padStart(2, "0")} / 09</span>
      </div>
    </div>
  );
}
