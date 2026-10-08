import { ClipboardList, ExternalLink, FileImage, Phone } from "lucide-react";

const preparation = [
  "Ten a mano tu documento de identidad, orden médica y autorización, si aplica.",
  "Consulta al agendar si tu estudio requiere una preparación especial y sigue las indicaciones del equipo de Imágenes Diagnósticas.",
  "Informa al equipo si estás embarazada o podrías estarlo, y comunica tus antecedentes, alergias y medicamentos actuales.",
  "Lleva los resultados e imágenes de estudios anteriores relacionados con tu examen, si los tienes.",
];

export function ImagingPatientGuide() {
  return (
    <>
      <section className="mt-10 border-t border-border pt-9" aria-labelledby="imaging-preparation">
        <div className="flex items-center gap-3">
          <ClipboardList aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
          <h2 id="imaging-preparation" className="text-xl text-primary sm:text-2xl">Preparación para tu estudio</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">La preparación depende del estudio y de la zona del cuerpo que se va a examinar.</p>
        <ul className="mt-5 space-y-3">
          {preparation.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl bg-[#f2f8fa] p-5 text-sm leading-7">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-2xl border border-primary/20 p-5 text-sm leading-7 text-muted-foreground">
          <h3 className="font-semibold text-primary">Ecografía y Doppler</h3>
          <p className="mt-2">Algunas ecografías requieren ayuno o una vejiga llena. Confirma con el equipo la preparación que corresponde a tu examen antes de cambiar tu alimentación, tomar líquidos o modificar tus medicamentos.</p>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Información general de referencia: <a href="https://www.radiologyinfo.org/es/info/genus" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">RadiologyInfo: ecografía (abre en otra pestaña)</a>. Sigue las instrucciones específicas que te entregue la clínica.</p>
      </section>
      <section className="mt-10 border-t border-border pt-9" aria-labelledby="imaging-results">
        <div className="flex items-center gap-3">
          <FileImage aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
          <h2 id="imaging-results" className="text-xl text-primary sm:text-2xl">Consulta de reportes e imágenes</h2>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Consulta el reporte del radiólogo y las imágenes de tu estudio en el portal de resultados. Al finalizar tu examen, solicita al equipo las instrucciones de acceso y la fecha estimada de disponibilidad.</p>
        <a href="https://clinicacolombiaes.imexhs.com/portal/login" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
          Consultar reportes e imágenes
          <span className="sr-only"> (abre en otra pestaña)</span>
        </a>
        <p className="mt-2 text-xs text-muted-foreground">El portal se abrirá en una nueva pestaña.</p>
        <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-7 text-muted-foreground">
          <li>Conserva el comprobante y las instrucciones de acceso que te entregue la clínica.</li>
          <li>Abre el portal con el botón “Consultar reportes e imágenes” e ingresa siguiendo las instrucciones de acceso que te entregue la clínica.</li>
          <li>Comparte el reporte y las imágenes disponibles con el médico que solicitó el estudio para revisar tus resultados.</li>
        </ol>
        <div className="mt-6 rounded-2xl bg-[#f2f8fa] p-5">
          <h3 className="font-semibold text-primary">¿Necesitas ayuda para consultar tu estudio?</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Comunícate con la clínica para recibir orientación sobre la entrega y el acceso a tus reportes e imágenes.</p>
          <a href="tel:+576063865320" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            <Phone aria-hidden="true" className="h-4 w-4" /> Llamar a la clínica
          </a>
        </div>
      </section>
    </>
  );
}
