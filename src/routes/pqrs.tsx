import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { sendPqrs } from "@/data/send-pqrs";
import { ArrowRight, ChevronDown, Mail, MessageSquare, Phone } from "lucide-react";

export const Route = createFileRoute("/pqrs")({
  head: () => ({ meta: [{ title: "PQRS — Clínica Noé" }, { name: "description", content: "Comparte tus peticiones, quejas, reclamos, sugerencias o felicitaciones con Clínica Noé." }] }),
  component: Pqrs,
});

const types = ["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"] as const;
const inputClass = "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#267794] focus:ring-2 focus:ring-[#267794]/10";

function Pqrs() {
  const [kind, setKind] = useState<(typeof types)[number]>("Petición");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const submitting = useRef(false);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    if (values.consentimiento !== "on") return;
    submitting.current = true;
    setSending(true);
    setResult(null);
    try {
      const response = await sendPqrs({ data: {
        tipo: kind,
        nombre: String(values.nombre ?? ""), correo: String(values.correo ?? ""),
        telefono: String(values.telefono ?? ""), documento: String(values.documento ?? ""),
        municipio: String(values.municipio ?? ""), eps: String(values.eps ?? ""),
        servicio: String(values.servicio ?? ""), mensaje: String(values.mensaje ?? ""),
        consentimiento: "on",
      } });
      setResult(response);
      if (response.ok) { form.reset(); setKind("Petici\u00f3n"); }
    } catch {
      setResult({ ok: false, message: "No pudimos confirmar el env\u00edo. Intenta m\u00e1s tarde o contacta a Servicio al Usuario." });
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }

  return (
    <>
      <div className="bg-[#0e3a4d] pt-32 sm:pt-44">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:pb-16">
          <nav aria-label="Ruta de navegación" className="mb-8 flex items-center gap-2 text-xs text-white/65">
            <Link to="/" className="hover:text-white">Inicio</Link><span aria-hidden="true">/</span><span className="text-white">PQRS</span>
          </nav>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#80cee0]">Te escuchamos</p>
          <h1 className="mt-4 text-4xl !text-white sm:text-5xl">Tu voz nos ayuda a mejorar.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Comparte una petición, queja, reclamo, sugerencia o felicitación. Queremos conocer tu experiencia.</p>
        </div>
      </div>

      <section className="bg-[#f8fafb] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          <aside>
            <MessageSquare aria-hidden="true" className="h-7 w-7 text-[#267794]" strokeWidth={1.5} />
            <h2 className="mt-5 text-xl">Estamos para escucharte</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Cuéntanos qué ocurrió y cómo podemos ayudarte. Los campos con * son obligatorios.</p>
            <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
              <a href="mailto:coor.siau@clinicanoe.com.co" className="flex items-start gap-3 text-sm text-[#267794] hover:underline"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span className="break-all">coor.siau@clinicanoe.com.co</span></a>
              <a href="tel:+576063865320" className="flex items-center gap-3 text-sm text-[#267794] hover:underline"><Phone aria-hidden="true" className="h-4 w-4" />(606) 386 5320</a>
            </div>
          </aside>

          <form onSubmit={submitMessage} className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10">
            <fieldset>
              <legend className="text-lg font-semibold text-[#0e3a4d]">¿Qué quieres compartir?</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {types.map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input className="peer sr-only" type="radio" name="tipo" value={type} checked={kind === type} onChange={() => { setKind(type); setResult(null); }} />
                    <span className="block rounded-full border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition hover:border-[#267794] peer-checked:border-[#267794] peer-checked:bg-[#edf7fa] peer-checked:text-[#267794] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#267794]">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-9 border-t border-slate-100 pt-8">
              <legend className="sr-only">Datos de contacto</legend>
              <h2 className="text-lg">Tus datos de contacto</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium sm:col-span-2">Nombre completo *<input name="nombre" autoComplete="name" required maxLength={150} placeholder="Escribe tu nombre" className={inputClass} /></label>
                <label className="text-sm font-medium">Correo electrónico *<input name="correo" type="email" autoComplete="email" required maxLength={200} placeholder="nombre@correo.com" className={inputClass} /></label>
                <label className="text-sm font-medium">Teléfono<input name="telefono" type="tel" autoComplete="tel" maxLength={30} placeholder="Número de contacto" className={inputClass} /></label>
              </div>
            </fieldset>

            <details className="mt-7 rounded-xl border border-slate-200 px-4 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-[#267794]">Datos de la atención <span className="ml-auto text-xs font-normal text-slate-500">Opcional</span><ChevronDown aria-hidden="true" className="h-4 w-4" /></summary>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm">Número de documento<input name="documento" maxLength={30} className={inputClass} /></label>
                <label className="text-sm">Municipio<input name="municipio" maxLength={100} className={inputClass} /></label>
                <label className="text-sm">EPS o aseguradora<input name="eps" maxLength={100} className={inputClass} /></label>
                <label className="text-sm">Servicio de atención<select name="servicio" className={inputClass} defaultValue=""><option value="">Selecciona un servicio</option>{["Urgencias", "Hospitalización", "Consulta externa", "Cirugía", "Imágenes diagnósticas", "Laboratorio", "Unidad de Cuidados Intensivos", "Administrativo", "Otro"].map((service) => <option key={service}>{service}</option>)}</select></label>
              </div>
            </details>

            <label className="mt-8 block text-sm font-medium" htmlFor="pqrs-message">Cuéntanos tu experiencia *<textarea id="pqrs-message" name="mensaje" required minLength={10} maxLength={3000} rows={6} placeholder="Describe tu solicitud. Si aplica, incluye la fecha y el servicio en el que recibiste atención." className={`${inputClass} resize-y`} /></label>

            <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" name="consentimiento" required className="mt-1 h-4 w-4 shrink-0 accent-[#267794]" /><span>Autorizo el uso de mis datos de contacto para gestionar y responder esta solicitud. *</span></label>

            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-5 text-slate-500">Tu solicitud se enviará directamente a Servicio al Usuario.</p>
              <button type="submit" disabled={sending} className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#267794] px-6 py-3.5 text-sm font-semibold text-white transition disabled:cursor-wait disabled:opacity-60 hover:bg-[#1e6179] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267794]">{sending ? "Enviando..." : "Enviar solicitud"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
            </div>
            {result && <p role={result.ok ? "status" : "alert"} className={`mt-5 rounded-xl p-4 text-sm leading-6 ${result.ok ? "bg-[#edf7fa] text-[#267794]" : "bg-red-50 text-red-800"}`}>{result.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
