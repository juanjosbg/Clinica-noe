import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { institutionalSections } from "@/data/institutional";
import { services } from "@/data/services";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function InstitutionalSearch({ onSelect, onOpenChange, triggerClass }: { onSelect: (id: string) => void; onOpenChange: (open: boolean) => void; triggerClass: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const term = normalize(query.trim());
  const topics = term ? institutionalSections.filter((item) => normalize(`${item.title} ${item.description} ${item.id}`).includes(term)) : [];
  const matchingServices = term ? services.filter((item) => normalize(`${item.title} ${item.summary} ${item.highlights.join(" ")} ${item.specialties?.join(" ") ?? ""}`).includes(term)) : [];
  function changeOpen(value: boolean) {
    setOpen(value);
    onOpenChange(value);
    if (!value) setQuery("");
  }
  function selectTopic(id: string) {
    onSelect(id);
    changeOpen(false);
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }
  const resultClass = "flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 px-5 py-4 text-left text-sm text-[#0e3a4d] transition hover:border-primary/40 hover:bg-[#f2f8fa] focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger asChild><button type="button" aria-label="Buscar información y servicios" className={`${triggerClass} w-auto gap-3 px-5`}><span className="text-sm font-medium">Buscar</span><Search aria-hidden="true" className="h-4 w-4" /></button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-white" />
        <Dialog.Content className="fixed inset-0 z-[71] overflow-y-auto bg-white px-6 py-20 outline-none sm:px-10">
          <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center">
            <div className="mb-8 flex justify-end"><Dialog.Close aria-label="Cerrar buscador" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0e3a4d] text-white transition hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><X aria-hidden="true" className="h-5 w-5" /></Dialog.Close></div>
            <Dialog.Title className="text-center text-2xl font-semibold text-[#0e3a4d] sm:text-3xl">Encuentra lo que necesitas en Clínica Noé</Dialog.Title>
            <Dialog.Description className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-muted-foreground sm:text-base">Busca servicios médicos, información para tu atención o temas institucionales. También puedes elegir uno de los accesos rápidos.</Dialog.Description>
            <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-9 flex items-center gap-2 rounded-full border border-slate-200 p-2 pl-5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <label htmlFor="institutional-search" className="sr-only">¿En qué podemos ayudarte hoy?</label>
              <input id="institutional-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿En qué podemos ayudarte hoy?" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#0e3a4d] outline-none placeholder:text-slate-400" />
              <button type="submit" aria-label="Buscar" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-[#0e3a4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><Search aria-hidden="true" className="h-5 w-5" /></button>
            </form>
            {term ? (
              <div className="mt-6 max-h-[40dvh] space-y-2 overflow-y-auto pb-2">
                <p role="status" className="mb-3 text-sm text-muted-foreground">{topics.length + matchingServices.length} resultados</p>
                {topics.map((item) => <button key={item.id} type="button" onClick={() => selectTopic(item.id)} className={resultClass}><span><span className="block font-medium">{item.title}</span><span className="mt-1 block text-xs text-muted-foreground">{item.description}</span></span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></button>)}
                {matchingServices.map((item) => <Link key={item.slug} to="/servicios/$slug" params={{ slug: item.slug }} onClick={() => changeOpen(false)} className={resultClass}><span><span className="block font-medium">{item.shortTitle}</span><span className="mt-1 block text-xs text-muted-foreground">Servicio médico</span></span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}
                {topics.length + matchingServices.length === 0 && <p className="py-4 text-sm leading-7 text-muted-foreground">No encontramos coincidencias. Prueba con otro término o elige un acceso rápido.</p>}
              </div>
            ) : null}
            <nav aria-label="Accesos rápidos del buscador" className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3 pb-8">
              {institutionalSections.map((item) => <button key={item.id} type="button" onClick={() => selectTopic(item.id)} className="rounded-full border border-primary/35 px-4 py-2 text-xs text-[#0e3a4d] transition hover:bg-[#edf7fa] focus-visible:outline-2 focus-visible:outline-primary sm:text-sm">{item.title}</button>)}
            </nav>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
