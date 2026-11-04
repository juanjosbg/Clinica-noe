import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Download, FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { akilaUrl, appointmentWhatsapp, currentResultsUrl, institutionalDocuments, institutionalSections, serviceContacts } from "@/data/institutional";

export const Route = createFileRoute("/informacion-institucional")({
  head: () => ({ meta: [{ title: "Información institucional — Clínica Noé" }, { name: "description", content: "Políticas, sedes, derechos y deberes, convenios, oportunidades laborales y canales de atención de Clínica Noé." }] }),
  component: InstitutionalInformation,
});

const actionClass = "inline-flex items-center gap-2 rounded-full border border-[#267794]/25 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-[#edf7fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const sectionClass = "scroll-mt-44 border-b border-slate-200 pb-12 last:border-0";

function DocumentCard({ id }: { id: string }) {
  const document = institutionalDocuments.find((item) => item.id === id)!;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <FileText aria-hidden="true" className="h-5 w-5 text-primary" />
      <h3 className="mt-4 text-base font-semibold">{document.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{document.description}</p>
      {document.url ? <div className="mt-4 flex flex-wrap gap-3"><a href={document.url} target="_blank" rel="noopener noreferrer" className={actionClass}>Consultar<span className="sr-only"> (otra pestaña)</span><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><a href={document.url} download className={actionClass}><Download aria-hidden="true" className="h-4 w-4" />Descargar</a></div> : <p className="mt-4 text-xs leading-5 text-slate-500">Documento oficial pendiente de publicación.</p>}
    </div>
  );
}

function InstitutionalInformation() {
  return (
    <>
      <PageHero eyebrow="Información institucional" title="Más cerca" accent="de ti" description="Encuentra información de la Clínica, recursos para tu atención y espacios para participar." />
      <section className="bg-[#f8fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Temas de información institucional" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {institutionalSections.map((item) => <a key={item.id} href={`#${item.id}`} className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary"><span><span className="block text-sm font-semibold text-[#0e3a4d]">{item.title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span></span><ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" /></a>)}
          </nav>
          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <aside className="self-start rounded-2xl bg-[#edf7fa] p-6 lg:sticky lg:top-40">
              <h2 className="text-lg">¿Necesitas orientación?</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Nuestro equipo de Servicio al Usuario puede ayudarte a encontrar la información que necesitas.</p>
              <a href="mailto:coor.siau@clinicanoe.com.co" className="mt-5 flex items-center gap-2 text-sm text-primary hover:underline"><Mail aria-hidden="true" className="h-4 w-4" />Escríbenos</a>
              <a href="tel:+576063865320" className="mt-4 block text-sm text-primary hover:underline">(606) 386 5320<br /><span className="text-xs">Ext. 3170 / 3612</span></a>
              <Link to="/pqrs" className="mt-5 inline-block text-sm font-medium text-primary underline">Compartir una PQRS</Link>
            </aside>
            <div className="min-w-0 space-y-12">
              <section id="politicas" className={sectionClass}>
                <h2 className="text-2xl">Políticas y compromisos institucionales</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Consulta los documentos institucionales de calidad, compromiso ambiental y seguridad del paciente cuando estén disponibles.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">{["calidad", "ambiental", "seguridad"].map((id) => <DocumentCard key={id} id={id} />)}</div>
              </section>

              <section id="resultados" className={sectionClass}>
                <h2 className="text-2xl">Resultados de imágenes diagnósticas</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Accede al portal de resultados con las instrucciones y credenciales que te entregue la Clínica. Consulta tus estudios y las opciones de descarga disponibles en la plataforma.</p>
                <a href={akilaUrl ?? currentResultsUrl} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-5`}>Consultar resultados{akilaUrl ? " en Akila" : ""}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (otra pestaña)</span></a>
                {!akilaUrl && <p className="mt-3 text-xs leading-6 text-muted-foreground">El acceso específico a Akila está pendiente de confirmación. Este botón abre el portal actualmente disponible en el sitio.</p>}
                <Link to="/servicios/$slug" params={{ slug: "imagenes-diagnosticas" }} className="mt-4 block text-sm text-primary underline">Preparación y orientación para tus estudios</Link>
              </section>

              <section id="sedes" className={sectionClass}>
                <h2 className="text-2xl">Nuestras sedes</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Confirma el lugar de atención al programar tu cita. El directorio completo de sedes y sus servicios habilitados está pendiente de actualización institucional.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-slate-200 bg-white p-6"><MapPin aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-3 text-lg">Clínica Noé</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Carrera 7 #45-80, Pereira.<br />PBX: (606) 386 5320.<br />Urgencias para adultos: atención 24 horas.</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Clínica Noé Carrera 7 #45-80 Pereira")}`} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-4`}>Ver ubicación<span className="sr-only"> (otra pestaña)</span></a></article>
                  <article className="rounded-2xl border border-slate-200 bg-white p-6"><MapPin aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-3 text-lg">Consulta Externa</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Calle 38 #11-73, avenida 30 de Agosto, diagonal a Telemark.<br />Lunes a jueves: 7:00 a. m. a 5:00 p. m.<br />Viernes: 7:00 a. m. a 4:00 p. m.</p><a href="tel:+573009145181" className="mt-3 block text-sm text-primary underline">300 914 5181</a><Link to="/servicios/$slug" params={{ slug: "consulta-externa" }} className={`${actionClass} mt-4`}>Información del servicio</Link></article>
                </div>
              </section>

              <section id="convenios" className={sectionClass}><h2 className="text-2xl">Convenios y entidades atendidas</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Para confirmar si tu EPS, aseguradora o entidad tiene convenio para el servicio que necesitas, comunícate con Servicio al Usuario antes de tu atención.</p><p className="mt-4 rounded-xl bg-white p-4 text-sm text-muted-foreground">El listado oficial de convenios y poblaciones atendidas está pendiente de publicación.</p><a href="mailto:coor.siau@clinicanoe.com.co?subject=Consulta%20sobre%20convenios" className={`${actionClass} mt-5`}>Consultar mi entidad<Mail aria-hidden="true" className="h-4 w-4" /></a></section>

              <section id="derechos" className={sectionClass}><h2 className="text-2xl">Derechos y deberes de los pacientes</h2><p className="mt-3 mb-6 text-sm leading-7 text-muted-foreground">Un espacio para conocer la información institucional dirigida a pacientes, familias y acompañantes.</p><DocumentCard id="derechos" /></section>

              <section id="talento-humano" className={sectionClass}><h2 className="text-2xl">Trabaja con nosotros</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Conoce las convocatorias de Talento Humano y los mecanismos institucionales para participar en los procesos de selección.</p><div id="vacantes" className="mt-6 scroll-mt-44 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg">Vacantes disponibles</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">La información de convocatorias y el canal oficial de recepción de hojas de vida están pendientes de publicación. Este espacio aún no recibe postulaciones.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Cada convocatoria incluirá perfil, formación académica, experiencia, funciones, condiciones de contratación y mecanismo de postulación.</p></div></section>

              <section id="asociacion" className={sectionClass}><h2 className="text-2xl">Asociación de Usuarios</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Encuentra aquí las convocatorias, reuniones y actividades de participación de los usuarios de la Clínica.</p><p className="mt-4 rounded-xl bg-white p-4 text-sm text-muted-foreground">El calendario de reuniones y los mecanismos de vinculación están pendientes de publicación.</p><a href="mailto:coor.siau@clinicanoe.com.co?subject=Orientaci%C3%B3n%20sobre%20Asociaci%C3%B3n%20de%20Usuarios" className={`${actionClass} mt-5`}>Solicitar orientación<Mail aria-hidden="true" className="h-4 w-4" /></a></section>

              <section id="canales" className={sectionClass}>
                <h2 className="text-2xl">Líneas y canales de atención</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Selecciona el servicio con el que necesitas comunicarte.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">{serviceContacts.map((contact) => <article key={contact.name} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-base font-semibold">{contact.name}</h3>{contact.phone && <a href={`tel:${contact.phone}`} className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"><Phone aria-hidden="true" className="h-4 w-4 shrink-0" />{contact.phone === "+576063865320" ? "(606) 386 5320 · Ext. 3170 / 3612" : contact.phone.slice(3)}</a>}{contact.email && <a href={`mailto:${contact.email}`} className="mt-3 flex items-start gap-2 text-sm text-primary hover:underline"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span className="break-all">{contact.email}</span></a>}{contact.whatsapp && <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-4`}><MessageCircle aria-hidden="true" className="h-4 w-4" />{contact.name.includes("Consulta") ? "Solicitar cita por WhatsApp" : "WhatsApp del servicio"}<span className="sr-only"> (otra pestaña)</span></a>}{!contact.phone && !contact.email && <p className="mt-3 text-sm leading-6 text-muted-foreground">Línea directa pendiente de publicación. Solicita orientación en el PBX <a href="tel:+576063865320" className="text-primary underline">(606) 386 5320</a>.</p>}</article>)}</div>
                <a href={appointmentWhatsapp} target="_blank" rel="noopener noreferrer" className={`${actionClass} mt-6`}><MessageCircle aria-hidden="true" className="h-4 w-4" />Solicitar cita de Consulta Externa por WhatsApp<span className="sr-only"> (otra pestaña)</span></a>
              </section>

              <section id="historia-clinica" className={sectionClass}><h2 className="text-2xl">Solicitud de historia clínica</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Para recibir orientación sobre la solicitud de una copia, contacta a Servicio al Usuario. Confirma con el equipo el canal autorizado antes de enviar documentos o información clínica.</p><div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-base font-semibold">Información del procedimiento</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Los requisitos, documentos para pacientes y terceros autorizados, canal de radicación, horarios y tiempos de respuesta están pendientes de confirmación y publicación institucional.</p></div><a href="mailto:coor.siau@clinicanoe.com.co?subject=Orientaci%C3%B3n%20para%20solicitar%20historia%20cl%C3%ADnica" className={`${actionClass} mt-5`}><Mail aria-hidden="true" className="h-4 w-4" />Consultar el procedimiento</a></section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
