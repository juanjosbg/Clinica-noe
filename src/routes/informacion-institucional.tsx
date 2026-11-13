import { createFileRoute, redirect, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Download, FileText, Heart, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { InstitutionalCarousel } from "@/components/InstitutionalCarousel";
import { PageHero } from "@/components/PageHero";
import { akilaUrl, appointmentWhatsapp, currentResultsUrl, institutionalDocuments, institutionalSections, serviceContacts } from "@/data/institutional";

export const Route = createFileRoute("/informacion-institucional")({
  beforeLoad: ({ location }) => {
    if (location.hash === "historia-clinica") throw redirect({ to: "/historia-clinica" });
  },
  head: () => ({ meta: [{ title: "Información institucional — Clínica Noé" }, { name: "description", content: "Políticas, sedes, derechos y deberes, convenios, oportunidades laborales y canales de atención de Clínica Noé." }] }),
  component: InstitutionalInformation,
});

const actionClass = "inline-flex items-center gap-2 rounded-full border border-[#267794]/25 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-[#edf7fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const sectionClass = "scroll-mt-44";

function DocumentCard({ id }: { id: string }) {
  const document = institutionalDocuments.find((item) => item.id === id)!;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <FileText aria-hidden="true" className="h-5 w-5 text-primary" />
      <h3 className="mt-4 text-base font-semibold">{document.url ? <a href={document.url} target="_blank" rel="noopener noreferrer" className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{document.title}<span className="sr-only"> (PDF, otra pestaña)</span></a> : document.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{document.description}</p>
      {document.url ? <div className="mt-4 flex flex-wrap gap-3"><a href={document.url} target="_blank" rel="noopener noreferrer" className={actionClass}>Consultar<span className="sr-only"> (otra pestaña)</span><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><a href={document.url} download className={actionClass}><Download aria-hidden="true" className="h-4 w-4" />Descargar</a></div> : <p className="mt-4 text-xs leading-5 text-slate-500">Documento oficial pendiente de publicación.</p>}
    </div>
  );
}

function InstitutionalInformation() {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const navigate = useNavigate();
  const topicHash = hash === "vacantes" ? "talento-humano" : hash;
  const activeId = institutionalSections.some((item) => item.id === topicHash) ? topicHash : "politicas";

  return (
    <>
      <PageHero eyebrow="Información institucional" title="Más cerca" accent="de ti" description="Encuentra información de la Clínica, recursos para tu atención y espacios para participar." />
      <section className="bg-[#f8fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <InstitutionalCarousel activeId={activeId} onSelect={(id) => { if (id === "historia-clinica") { void navigate({ to: "/historia-clinica" }); return; } void navigate({ hash: id, replace: true, resetScroll: false, hashScrollIntoView: false }); }} />
          <div className="mt-10 grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
            <aside className="overflow-hidden rounded-2xl border border-[#dceef3] bg-[#edf7fa] lg:sticky lg:top-40">
              <div className="relative h-44 overflow-hidden">
                <img src="/Photos/Clinica-Noe2.jpg" alt="Fachada de Clínica Noé" width={1080} height={625} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a4d]/70 to-transparent" />
                <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">Estamos cerca de ti</span>
              </div>
              <div className="p-6">
              <h2 className="text-lg">¿Necesitas orientación?</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Nuestro equipo de Servicio al Usuario puede ayudarte a encontrar la información que necesitas.</p>
              <a href="mailto:coor.siau@clinicanoe.com.co" className="mt-5 flex items-center gap-2 text-sm text-primary hover:underline"><Mail aria-hidden="true" className="h-4 w-4" />Escríbenos</a>
              <a href="tel:+576063865320" className="mt-4 block text-sm text-primary hover:underline">(606) 386 5320<br /><span className="text-xs">Ext. 3170 / 3612</span></a>
              <Link to="/pqrs" className="mt-5 inline-block text-sm font-medium text-primary underline">Compartir una PQRS</Link>
              </div>
            </aside>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="relative mb-8 isolate overflow-hidden rounded-2xl bg-[#0e3a4d]">
                <img src="/Photos/Clinica-Noe.jpg" alt="Vista de las instalaciones de Clínica Noé" width={700} height={400} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0e3a4d] via-[#0e3a4d]/90 to-[#0e3a4d]/10" />
                <div className="max-w-sm px-6 py-8 sm:px-8 sm:py-10">
                  <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#b4e3ed]"><Heart aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />Clínica Noé</span>
                  <p className="text-2xl font-semibold leading-tight text-white sm:text-3xl">Cuidamos lo que más amas.</p>
                  <p className="mt-3 max-w-[240px] text-sm leading-6 text-white/80">Información y orientación para acompañarte en cada paso.</p>
                </div>
              </div>
              <section id="politicas" hidden={activeId !== "politicas"} aria-labelledby="topic-politicas" className={sectionClass}>
                <h2 className="text-2xl">Políticas y compromisos institucionales</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Consulta los documentos institucionales de calidad, compromiso ambiental y seguridad del paciente.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">{["calidad", "ambiental", "seguridad"].map((id) => <DocumentCard key={id} id={id} />)}</div>
              </section>

              <section id="resultados" hidden={activeId !== "resultados"} aria-labelledby="topic-resultados" className={sectionClass}>
                <h2 className="text-2xl">Resultados de imágenes diagnósticas</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Accede al portal de resultados con las instrucciones y credenciales que te entregue la Clínica. Consulta tus estudios y las opciones de descarga disponibles en la plataforma.</p>
                <a href={akilaUrl ?? currentResultsUrl} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-5`}>Consultar resultados{akilaUrl ? " en Akila" : ""}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (otra pestaña)</span></a>
                {!akilaUrl && <p className="mt-3 text-xs leading-6 text-muted-foreground">El acceso específico a Akila está pendiente de confirmación. Este botón abre el portal actualmente disponible en el sitio.</p>}
                <Link to="/servicios/$slug" params={{ slug: "imagenes-diagnosticas" }} className="mt-4 block text-sm text-primary underline">Preparación y orientación para tus estudios</Link>
              </section>

              <section id="sedes" hidden={activeId !== "sedes"} aria-labelledby="topic-sedes" className={sectionClass}>
                <h2 className="text-2xl">Nuestras sedes</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Confirma el lugar de atención al programar tu cita. El directorio completo de sedes y sus servicios habilitados está pendiente de actualización institucional.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-slate-200 bg-white p-6"><MapPin aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-3 text-lg">Clínica Noé</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Carrera 7 #45-80, Pereira.<br />PBX: (606) 386 5320.<br />Urgencias para adultos: atención 24 horas.</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Clínica Noé Carrera 7 #45-80 Pereira")}`} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-4`}>Ver ubicación<span className="sr-only"> (otra pestaña)</span></a></article>
                  <article className="rounded-2xl border border-slate-200 bg-white p-6"><MapPin aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-3 text-lg">Consulta Externa</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Calle 38 #11-73, avenida 30 de Agosto, diagonal a Telemark.<br />Lunes a jueves: 7:00 a. m. a 5:00 p. m.<br />Viernes: 7:00 a. m. a 4:00 p. m.</p><a href="tel:+573009145181" className="mt-3 block text-sm text-primary underline">300 914 5181</a><Link to="/servicios/$slug" params={{ slug: "consulta-externa" }} className={`${actionClass} mt-4`}>Información del servicio</Link></article>
                </div>
              </section>

              <section id="convenios" hidden={activeId !== "convenios"} aria-labelledby="topic-convenios" className={sectionClass}><h2 className="text-2xl">Convenios y entidades atendidas</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Para confirmar si tu EPS, aseguradora o entidad tiene convenio para el servicio que necesitas, comunícate con Servicio al Usuario antes de tu atención.</p><p className="mt-4 rounded-xl bg-white p-4 text-sm text-muted-foreground">El listado oficial de convenios y poblaciones atendidas está pendiente de publicación.</p><a href="mailto:coor.siau@clinicanoe.com.co?subject=Consulta%20sobre%20convenios" className={`${actionClass} mt-5`}>Consultar mi entidad<Mail aria-hidden="true" className="h-4 w-4" /></a></section>

              <section id="derechos" hidden={activeId !== "derechos"} aria-labelledby="topic-derechos" className={sectionClass}><h2 className="text-2xl">Derechos y deberes de los pacientes</h2><p className="mt-3 mb-6 text-sm leading-7 text-muted-foreground">Un espacio para conocer la información institucional dirigida a pacientes, familias y acompañantes.</p><DocumentCard id="derechos" /></section>

              <section id="talento-humano" hidden={activeId !== "talento-humano"} aria-labelledby="topic-talento-humano" className={sectionClass}><h2 className="text-2xl">Trabaja con nosotros</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Conoce las convocatorias de Talento Humano y los mecanismos institucionales para participar en los procesos de selección.</p><div id="vacantes" className="mt-6 scroll-mt-44 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg">Vacantes disponibles</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">La información de convocatorias y el canal oficial de recepción de hojas de vida están pendientes de publicación. Este espacio aún no recibe postulaciones.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Cada convocatoria incluirá perfil, formación académica, experiencia, funciones, condiciones de contratación y mecanismo de postulación.</p></div></section>

              <section id="asociacion" hidden={activeId !== "asociacion"} aria-labelledby="topic-asociacion" className={sectionClass}><h2 className="text-2xl">Asociación de Usuarios</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Encuentra aquí las convocatorias, reuniones y actividades de participación de los usuarios de la Clínica.</p><p className="mt-4 rounded-xl bg-white p-4 text-sm text-muted-foreground">El calendario de reuniones y los mecanismos de vinculación están pendientes de publicación.</p><a href="mailto:coor.siau@clinicanoe.com.co?subject=Orientaci%C3%B3n%20sobre%20Asociaci%C3%B3n%20de%20Usuarios" className={`${actionClass} mt-5`}>Solicitar orientación<Mail aria-hidden="true" className="h-4 w-4" /></a></section>

              <section id="canales" hidden={activeId !== "canales"} aria-labelledby="topic-canales" className={sectionClass}>
                <h2 className="text-2xl">Líneas y canales de atención</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Selecciona el servicio con el que necesitas comunicarte.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">{serviceContacts.map((contact) => <article key={contact.name} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-base font-semibold">{contact.name}</h3>{contact.phone && <a href={`tel:${contact.phone}`} className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"><Phone aria-hidden="true" className="h-4 w-4 shrink-0" />{contact.phone === "+576063865320" ? "(606) 386 5320 · Ext. 3170 / 3612" : contact.phone.slice(3)}</a>}{contact.email && <a href={`mailto:${contact.email}`} className="mt-3 flex items-start gap-2 text-sm text-primary hover:underline"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span className="break-all">{contact.email}</span></a>}{contact.whatsapp && <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-4`}><MessageCircle aria-hidden="true" className="h-4 w-4" />{contact.name.includes("Consulta") ? "Solicitar cita por WhatsApp" : "WhatsApp del servicio"}<span className="sr-only"> (otra pestaña)</span></a>}{!contact.phone && !contact.email && <p className="mt-3 text-sm leading-6 text-muted-foreground">Línea directa pendiente de publicación. Solicita orientación en el PBX <a href="tel:+576063865320" className="text-primary underline">(606) 386 5320</a>.</p>}</article>)}</div>
                <a href={appointmentWhatsapp} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-6`}><MessageCircle aria-hidden="true" className="h-4 w-4" />Solicitar cita de Consulta Externa por WhatsApp<span className="sr-only"> (otra pestaña)</span></a>
              </section>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
