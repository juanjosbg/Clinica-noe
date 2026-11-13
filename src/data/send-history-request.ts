import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const historyRecipient = "gestion.documental@clinicanoe.com.co";

function documentUrl(value: string | undefined) {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    return new URL(value).protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}
function configuration() {
  const formUrl = documentUrl(process.env.HISTORY_FORM_URL) ??
    encodeURI("/images/doc/GDC-GDC-FT-001 V5 SOLICITUD DE HISTORIA CLÍNICA (1) (1).pdf");
  const termsUrl = documentUrl(process.env.HISTORY_TERMS_URL);
  const policyUrl = documentUrl(process.env.HISTORY_POLICY_URL);
  return {
    formUrl,
    termsUrl,
    policyUrl,
    enabled: Boolean(
      formUrl &&
      termsUrl &&
      policyUrl &&
      process.env.RESEND_API_KEY &&
      process.env.HISTORY_MAIL_FROM,
    ),
  };
}
export const getHistoryFormConfig = createServerFn({ method: "GET" }).handler(async () =>
  configuration(),
);
const requestSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(1).max(30),
  applicantType: z.enum(["Paciente", "Tercero autorizado", "Representante legal"]),
  terms: z.literal("on"),
  consent: z.literal("on"),
});
export const sendHistoryRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Solicitud inválida");
    return data;
  })
  .handler(async ({ data }) => {
    if (!configuration().enabled)
      return {
        ok: false,
        message: "El envío en línea aún no está habilitado. Comunícate con Servicio al Usuario.",
      };
    const parsed = requestSchema.safeParse(Object.fromEntries(data));
    if (!parsed.success)
      return {
        ok: false,
        message: "Revisa los datos del solicitante y acepta las dos autorizaciones.",
      };
    const documents = [
      ["patientDocument", "documento-paciente"],
      ["applicantDocument", "documento-solicitante"],
      ["requestDocument", "solicitud-historia-clinica"],
    ];
    const attachments: { filename: string; content: string }[] = [];
    for (const [key, filename] of documents) {
      const file = data.get(key);
      if (!(file instanceof File) || !file.size || file.size > 3 * 1024 * 1024)
        return {
          ok: false,
          message: "Adjunta los tres documentos. El tamaño máximo de cada archivo es de 3 MB.",
        };
      const bytes = Buffer.from(await file.arrayBuffer());
      const extension =
        file.type === "application/pdf" && bytes.subarray(0, 5).toString() === "%PDF-"
          ? "pdf"
          : file.type === "image/jpeg" &&
              bytes[0] === 0xff &&
              bytes[1] === 0xd8 &&
              bytes[2] === 0xff
            ? "jpg"
            : file.type === "image/png" &&
                bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
              ? "png"
              : null;
      if (!extension)
        return { ok: false, message: "Los documentos deben ser archivos PDF, JPG o PNG válidos." };
      attachments.push({ filename: `${filename}.${extension}`, content: bytes.toString("base64") });
    }
    const values = parsed.data;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.HISTORY_MAIL_FROM,
          to: [historyRecipient],
          reply_to: values.email,
          subject: "Solicitud de historia clínica",
          text: `Solicitante: ${values.firstName} ${values.lastName}\nCorreo: ${values.email}\nTeléfono: ${values.phone}\nSolicitud realizada por: ${values.applicantType}\n\nAceptó los términos y condiciones y autorizó el tratamiento de datos para gestionar esta solicitud.\nFecha: ${new Date().toISOString()}`,
          attachments,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = response.ok ? ((await response.json()) as { id?: string }) : null;
      if (!result?.id)
        return {
          ok: false,
          message:
            "No se pudo confirmar el envío. Comunícate con Servicio al Usuario antes de reintentar.",
        };
      return {
        ok: true,
        message:
          "Tu solicitud y sus documentos fueron enviados. Servicio al Usuario te contactará a través de los datos proporcionados.",
      };
    } catch {
      return {
        ok: false,
        message:
          "No se pudo confirmar el envío. Comunícate con Servicio al Usuario antes de reintentar.",
      };
    }
  });
