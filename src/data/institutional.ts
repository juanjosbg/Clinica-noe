// Publicar únicamente documentos y datos aprobados por la Clínica.
export const institutionalDocuments: { id: string; title: string; description: string; url: string | null }[] = [
  { id: "calidad", title: "Política de Calidad", description: "Promesa de valor institucional.", url: null },
  { id: "ambiental", title: "Compromiso ambiental", description: "Compromisos institucionales con el cuidado del ambiente.", url: null },
  { id: "seguridad", title: "Política de Seguridad del Paciente", description: "Lineamientos institucionales para una atención segura.", url: null },
  { id: "derechos", title: "Derechos y deberes de los pacientes", description: "Información para pacientes, familias y acompañantes.", url: null },
];

// Pendiente de recibir el enlace oficial de Akila. No asumir que el portal actual es Akila.
export const akilaUrl: string | null = null;
export const currentResultsUrl = "https://clinicacolombiaes.imexhs.com/portal/login";
export const appointmentWhatsapp = "https://wa.me/573166425093?text=" + encodeURIComponent("Hola, quisiera solicitar información para agendar una cita de consulta externa.");

export const institutionalSections = [
  { id: "politicas", title: "Políticas y compromisos", description: "Calidad, ambiente y seguridad del paciente." },
  { id: "resultados", title: "Resultados de imágenes", description: "Acceso al portal de estudios diagnósticos." },
  { id: "sedes", title: "Nuestras sedes", description: "Ubicación, servicios y horarios." },
  { id: "convenios", title: "Convenios y entidades", description: "Orientación sobre tu cobertura." },
  { id: "derechos", title: "Derechos y deberes", description: "Información para pacientes y familias." },
  { id: "talento-humano", title: "Trabaja con nosotros", description: "Talento Humano y oportunidades laborales." },
  { id: "asociacion", title: "Asociación de Usuarios", description: "Participación y encuentros." },
  { id: "canales", title: "Canales de atención", description: "Directorio y citas por WhatsApp." },
  { id: "historia-clinica", title: "Historia clínica", description: "Orientación para solicitar una copia." },
];

export const serviceContacts = [
  { name: "Programación ambulatoria", phone: null, email: null, whatsapp: null },
  { name: "Hemodinamia", phone: null, email: null, whatsapp: null },
  { name: "Imágenes diagnósticas", phone: "+573164781506", email: "imagenes@clinicanoe.com.co", whatsapp: "https://wa.me/573164781506" },
  { name: "Diagnóstico vascular", phone: null, email: null, whatsapp: null },
  { name: "Call Center de Consulta Externa", phone: "+573009145181", email: null, whatsapp: appointmentWhatsapp },
  { name: "Servicio al Usuario", phone: "+576063865320", email: "coor.siau@clinicanoe.com.co", whatsapp: null },
];
