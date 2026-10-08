import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { ServiceDetail } from "@/data/services";

export function ServiceCard({ service }: { service: ServiceDetail }) {
  const Icon = service.icon;
  return (
    <Link to="/servicios/$slug" params={{ slug: service.slug }} className="group flex h-full flex-col rounded-3xl border border-border/50 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
      <Icon aria-hidden="true" className="h-12 w-12 text-primary" strokeWidth={1.4} />
      <h3 className="mt-7 border-b border-border pb-5 text-lg uppercase">{service.shortTitle}</h3>
      <ul className="my-6 space-y-4">
        {service.highlights.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-full border border-primary" />{item}</li>)}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-8 text-sm font-medium text-primary">
        <span>Conocer servicio<span className="sr-only">: {service.shortTitle}</span></span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 group-hover:bg-primary group-hover:text-white"><Plus aria-hidden="true" className="h-5 w-5" /></span>
      </div>
    </Link>
  );
}
