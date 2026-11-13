import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Download, LoaderCircle, Upload } from "lucide-react";
import { getHistoryFormConfig, sendHistoryRequest } from "@/data/send-history-request";

export const Route = createFileRoute("/historia-clinica")({
  head: () => ({
    meta: [
      { title: "Solicitud de historia clínica — Clínica Noé" },
      {
        name: "description",
        content: "Formulario de solicitud de copia de historia clínica de Clínica Noé.",
      },
    ],
  }),
  loader: () => getHistoryFormConfig(),
  component: ClinicalHistoryPage,
});

const attachments = [
  {
    name: "patientDocument",
    label: "Fotocopia del documento de identidad del paciente por ambos lados",
  },
  { name: "applicantDocument", label: "Fotocopia del documento de identidad del solicitante" },
  { name: "requestDocument", label: "Formulario de solicitud de historia clínica" },
] as const;
const inputClass =
  "mt-2 block min-h-11 w-full rounded-md border border-primary/25 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

function ClinicalHistoryPage() {
  const config = Route.useLoaderData();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const submitting = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const { name } of attachments) {
      const file = data.get(name);
      if (
        !(file instanceof File) ||
        !file.size ||
        file.size > 3 * 1024 * 1024 ||
        !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
      ) {
        setResult({
          ok: false,
          message:
            "Adjunta los tres documentos en PDF, JPG o PNG. Cada archivo debe pesar como máximo 3 MB.",
        });
        return;
      }
    }
    submitting.current = true;
    setSending(true);
    setResult(null);
    try {
      const response = await sendHistoryRequest({ data });
      setResult(response);
      if (response.ok) form.reset();
    } catch {
      setResult({
        ok: false,
        message:
          "No pudimos confirmar el envío. Comunícate con Servicio al Usuario antes de volver a intentarlo.",
      });
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }
  return (
    <>
      <div className="h-24 bg-[#0e3a4d] sm:h-32" />
      <section className="bg-white px-4 py-8 sm:px-6 sm:py-12" aria-labelledby="history-title">
        <div className="mx-auto max-w-4xl">
          <nav
            aria-label="Ruta de navegación"
            className="mb-6 flex flex-wrap gap-2 text-xs text-muted-foreground"
          >
            <Link to="/" className="text-primary hover:underline">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Historia clínica</span>
          </nav>
          <div className="rounded-xl border border-primary/15 bg-[#edf7fa]/50 px-5 py-8 shadow-sm sm:px-10 sm:py-10">
            <div className="text-center">
              <p className="text-xs font-medium text-primary">Solicita ahora tu</p>
              <h1
                id="history-title"
                className="mt-2 text-2xl font-extrabold uppercase tracking-wide !text-[#267794] sm:text-4xl"
              >
                Solicitud de historia clínica
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Completa la información del solicitante y adjunta la documentación indicada en el
                formulario.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-busy={sending}>
              <fieldset disabled={sending} className="space-y-5 disabled:opacity-60">
                <legend className="sr-only">Datos y documentos de la solicitud</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-foreground">
                    Nombres del solicitante *
                    <input
                      name="firstName"
                      autoComplete="given-name"
                      required
                      maxLength={100}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-xs font-medium text-foreground">
                    Apellidos del solicitante *
                    <input
                      name="lastName"
                      autoComplete="family-name"
                      required
                      maxLength={100}
                      className={inputClass}
                    />
                  </label>
                </div>
                <label className="block text-xs font-medium text-foreground">
                  Correo electrónico *
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    className={inputClass}
                  />
                </label>
                <label className="block text-xs font-medium text-foreground">
                  Teléfono de contacto *
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    className={inputClass}
                  />
                </label>
                <label className="block text-xs font-medium text-foreground">
                  Solicitud realizada por *
                  <select
                    name="applicantType"
                    required
                    defaultValue="Paciente"
                    className={inputClass}
                  >
                    <option>Paciente</option>
                    <option>Tercero autorizado</option>
                    <option>Representante legal</option>
                  </select>
                </label>
                <div className="space-y-4">
                  {attachments.map(({ name, label }) => (
                    <div
                      key={name}
                      className="rounded-lg border border-dashed border-primary/30 bg-white p-4 sm:p-5"
                    >
                      <label
                        htmlFor={`history-${name}`}
                        className="block text-xs font-medium leading-5 text-foreground"
                      >
                        {label} *
                      </label>
                      <p
                        id={`history-${name}-help`}
                        className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Upload aria-hidden="true" className="h-3.5 w-3.5" />
                        PDF, JPG o PNG · Máximo 3 MB
                      </p>
                      <input
                        id={`history-${name}`}
                        name={name}
                        type="file"
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        aria-describedby={`history-${name}-help`}
                        className="mt-3 block w-full min-w-0 text-xs text-foreground file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white hover:file:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      />
                      {name === "requestDocument" && (
                          <a
                            href={config.formUrl}
                            download
                            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                          >
                            <Download aria-hidden="true" className="h-3.5 w-3.5" />
                            Descargar formulario de solicitud
                          </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-1 text-xs leading-5 text-foreground">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                    />
                    <span>
                      Acepto los{" "}
                      {config.termsUrl ? (
                        <a
                          href={config.termsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          términos y condiciones
                          <span className="sr-only"> (abre en otra pestaña)</span>
                        </a>
                      ) : (
                        "términos y condiciones"
                      )}
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                    />
                    <span>
                      Autorizo el tratamiento de mis datos personales para gestionar esta solicitud.
                    </span>
                  </label>
                  {config.policyUrl ? (
                    <a
                      href={config.policyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-semibold text-primary underline"
                    >
                      Ver política de datos personales
                      <span className="sr-only"> (abre en otra pestaña)</span>
                    </a>
                  ) : (
                    <p className="text-muted-foreground">
                      La política de datos personales de este trámite está pendiente de publicación.
                    </p>
                  )}
                </div>
                {!config.enabled && (
                  <p
                    role="status"
                    className="rounded-lg border border-primary/15 bg-white p-4 text-sm leading-6 text-muted-foreground"
                  >
                    El envío en línea aún no está habilitado. Para solicitar orientación, comunícate
                    con Servicio al Usuario al{" "}
                    <a href="tel:+576063865320" className="text-primary underline">
                      (606) 386 5320
                    </a>
                    , ext. 3170 / 3612.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!config.enabled || sending}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}
                  {sending ? "Enviando…" : "Enviar"}
                </button>
              </fieldset>
              {result && (
                <p
                  role={result.ok ? "status" : "alert"}
                  className={`rounded-lg border p-4 text-sm leading-6 ${result.ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}
                >
                  {result.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
