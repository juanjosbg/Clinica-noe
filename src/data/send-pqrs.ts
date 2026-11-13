import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  tipo: z.enum(["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"]),
  nombre: z.string().trim().min(1).max(150),
  correo: z.string().trim().email().max(200),
  telefono: z.string().trim().max(30),
  documento: z.string().trim().max(30),
  municipio: z.string().trim().max(100),
  eps: z.string().trim().max(100),
  servicio: z.string().trim().max(100),
  mensaje: z.string().trim().min(10).max(3000),
  consentimiento: z.literal("on"),
});

export const sendPqrs = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.PQRS_MAIL_FROM;
    if (!apiKey || !from) {
      return { ok: false, message: "El envío de solicitudes aún no está habilitado. Comunícate con coor.siau@clinicanoe.com.co o llama al (606) 386 5320." };
    }
    const fields = [
      ["Nombre", data.nombre], ["Correo", data.correo], ["Teléfono", data.telefono],
      ["Documento", data.documento], ["Municipio", data.municipio],
      ["EPS / aseguradora", data.eps], ["Servicio", data.servicio],
    ];
    const text = `${data.tipo}\n\n${fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMensaje:\n${data.mensaje}\n\nAutorizo el uso de mis datos para gestionar y responder esta solicitud.`;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: ["coor.siau@clinicanoe.com.co"], reply_to: data.correo, subject: `PQRS · ${data.tipo}`, text }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) return { ok: false, message: "No pudimos enviar tu solicitud. Intenta nuevamente más tarde o comunícate con Servicio al Usuario." };
      const result = await response.json() as { id?: string };
      if (!result.id) return { ok: false, message: "No pudimos confirmar el envío. Comunícate con Servicio al Usuario antes de reintentar." };
      return { ok: true, message: "Tu solicitud fue enviada a Servicio al Usuario. Te responderemos a través de los datos de contacto que proporcionaste." };
    } catch {
      return { ok: false, message: "No pudimos confirmar el envío. Revisa tu conexión o comunícate con Servicio al Usuario." };
    }
  });

