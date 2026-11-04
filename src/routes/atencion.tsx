import { createFileRoute, Link } from "@tanstack/react-router";
import { appointmentWhatsapp, akilaUrl, currentResultsUrl, institutionalSections } from "@/data/institutional";
import { PageHero } from "@/components/PageHero";
import { Calendar, FileText, CreditCard, Phone, MapPin, Clock, Mail, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/atencion")({
  head: () => ({
    meta: [
      { title: "Atención al paciente — Clínica Noé" },
      { name: "description", content: "Información útil para tu visita: agenda, resultados, pagos y orientación." },
      { property: "og:title", content: "Atención al paciente — Clínica Noé" },
      { property: "og:description", content: "Te acompañamos en cada paso de tu experiencia." },
    ],
  }),
  component: Atencion,
});

const items = [
  { icon: Calendar, title: "Agenda tu cita", desc: "Programa tu consulta con el especialista que necesitas." },
  { icon: FileText, title: "Portal de resultados", desc: "Consulta y descarga tus exámenes en línea." },
  { icon: CreditCard, title: "Medios de pago", desc: "Conoce las opciones disponibles para tus servicios." },
  { icon: Phone, title: "Línea 24/7", desc: "Comunícate con nosotros en cualquier momento." },
  { icon: MapPin, title: "Cómo llegar", desc: "Direcciones y rutas hacia nuestras sedes." },
  { icon: Clock, title: "Horarios", desc: "Conoce los horarios de cada servicio." },
];

const clinicAddress = "Carrera 7 #45-80, Pereira, Colombia";
const mapQuery = encodeURIComponent(`Clínica Noé, ${clinicAddress}`);

const contactLines = [
  { title: "Referencia y Contrarreferencia", extension: "3070", emails: ["coordinador.referencia@clinicanoe.com.co", "coordinador.ads@clinicanoe.com.co"] },
  { title: "Urgencias", extension: "3520", emails: ["coordinador.enfermeria@clinicanoe.com.co"] },
  { title: "Consulta Externa", extension: "", emails: [] },
  { title: "Servicio al Usuario", extension: "3170/3612", emails: ["coor.siau@clinicanoe.com.co"] },
];

function Atencion() {
  return (
    <>
      <PageHero
        eyebrow="Atención al paciente"
        title="Estamos aquí"
        accent="para acompañarte"
        description="Toda la información que necesitas para vivir una experiencia tranquila y segura en Clínica Noé."
      />
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => {
            const cardClass = "rounded-3xl bg-white p-7 shadow-soft hover-lift animate-fade-in-up";
            const content = <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Icon className="h-7 w-7" />
              </div>
              <span className="mt-5 block text-xl font-semibold text-foreground">{title}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{desc}</span>
            </>;

            if (title === "Línea 24/7") return (
              <Dialog.Root key={title}>
                <Dialog.Trigger asChild>
                  <button type="button" className={`${cardClass} cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`} style={{ animationDelay: `${i * 80}ms` }}>{content}</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#03172e]/60 backdrop-blur-sm" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-32px)] w-[560px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl outline-none">
                    <div className="relative bg-[#0e3a4d] px-6 py-6 pr-14">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80cee0]">Clínica Noé</p>
                      <Dialog.Title className="mt-2 text-lg font-semibold !text-white">Líneas de atención</Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-white/80">Teléfonos, extensiones y correos de contacto.</Dialog.Description>
                      <Dialog.Close aria-label="Cerrar líneas de atención" className="absolute right-4 top-5 rounded p-2 text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><X aria-hidden="true" className="h-5 w-5" /></Dialog.Close>
                    </div>
                    <div className="divide-y divide-slate-100 px-6 sm:px-8">
                      {contactLines.map((line) => (
                        <section key={line.title} className="py-6">
                          <h3 className="text-base font-semibold text-[#0e3a4d]">{line.title}</h3>
                          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <Phone aria-hidden="true" className="mr-1 h-4 w-4 shrink-0 text-primary" />
                            <a href="tel:+576063865320" className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary">(606) 386 5320</a>
                            {line.extension && <span className="text-muted-foreground">Ext. {line.extension}</span>}
                          </div>
                          {line.emails.map((email) => (
                            <a key={email} href={`mailto:${email}`} className="mt-3 flex items-start gap-3 text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span className="min-w-0 break-all">{email}</span></a>
                          ))}
                        </section>
                      ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            );

            if (title === "Cómo llegar") return (
              <Dialog.Root key={title}>
                <Dialog.Trigger asChild>
                  <button type="button" className={`${cardClass} cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`} style={{ animationDelay: `${i * 80}ms` }}>{content}</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#03172e]/60 backdrop-blur-sm" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-32px)] w-[760px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl outline-none">
                    <div className="relative bg-[#0e3a4d] px-6 py-6 pr-14">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80cee0]">Clínica Noé</p>
                      <Dialog.Title className="mt-2 text-lg font-semibold !text-white">Cómo llegar</Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-white/80">{clinicAddress}</Dialog.Description>
                      <Dialog.Close aria-label="Cerrar mapa" className="absolute right-4 top-5 rounded p-2 text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><X aria-hidden="true" className="h-5 w-5" /></Dialog.Close>
                    </div>
                    <iframe
                      title="Ubicación de Clínica Noé en Google Maps"
                      src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                      className="block h-[min(50dvh,400px)] min-h-[220px] w-full border-0"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                      <p className="text-sm text-muted-foreground">Consulta la ruta desde tu ubicación.</p>
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><MapPin aria-hidden="true" className="h-4 w-4" />Ver ruta en Google Maps<span className="sr-only"> (abre en otra pestaña)</span></a>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            );

            if (i === 0) return (
              <Dialog.Root key={title}>
                <Dialog.Trigger asChild>
                  <button type="button" className={`${cardClass} cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`} style={{ animationDelay: `${i * 80}ms` }}>{content}</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#03172e]/60 backdrop-blur-sm" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-32px)] w-[420px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl outline-none">
                    <div className="relative bg-[#0e3a4d] px-6 py-6 pr-12">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80cee0]">Clínica Noé</p>
                      <Dialog.Title className="mt-2 text-lg font-semibold !text-white">Nuestros canales de atención</Dialog.Title>
                      <Dialog.Close aria-label="Cerrar canales de atención" className="absolute right-4 top-5 rounded p-2 text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"><X aria-hidden="true" className="h-4 w-4" /></Dialog.Close>
                    </div>
                    <div className="space-y-6 p-6">
                      <a href={appointmentWhatsapp} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-primary/90">Solicitar cita por WhatsApp<span className="sr-only"> (otra pestaña)</span></a>
                      <div className="flex items-start gap-3">
                        <span className="rounded-full bg-[#e4f3f8] p-2.5 text-primary"><Phone aria-hidden="true" className="h-4 w-4" /></span>
                        <div><h3 className="text-sm font-semibold">Línea telefónica</h3><a href="tel:+576063865320" className="mt-1 block text-sm text-muted-foreground hover:text-primary hover:underline">PBX (606) 386 5320</a></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="rounded-full bg-[#e4f3f8] p-2.5 text-primary"><Mail aria-hidden="true" className="h-4 w-4" /></span>
                        <div className="min-w-0"><h3 className="text-sm font-semibold">Atención al paciente</h3><a href="mailto:coor.siau@clinicanoe.com.co" className="mt-1 block break-all text-sm text-muted-foreground hover:text-primary hover:underline">coor.siau@clinicanoe.com.co</a></div>
                      </div>
                      <Dialog.Description className="rounded-2xl bg-[#f2f8fa] p-4 text-xs leading-6 text-muted-foreground">Comunícate con nuestros canales para solicitar una cita y confirmar la disponibilidad y los horarios de atención.</Dialog.Description>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            );
            if (title === "Portal de resultados") return <a key={title} href={akilaUrl ?? currentResultsUrl} target="_blank" rel="noopener noreferrer" className={`${cardClass} focus-visible:outline-2 focus-visible:outline-primary`} style={{ animationDelay: `${i * 80}ms` }}>{content}<span className="sr-only"> (abre en otra pestaña)</span></a>;
            return <div key={title} className={cardClass} style={{ animationDelay: `${i * 80}ms` }}>{content}</div>;
          })}
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-6">
          <h2 className="text-2xl">Información para tu atención</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {institutionalSections.map((item) => <Link key={item.id} to="/informacion-institucional" hash={item.id} className="rounded-xl border border-border bg-white px-5 py-4 text-sm font-medium text-primary transition hover:bg-[#edf7fa]">{item.title}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
