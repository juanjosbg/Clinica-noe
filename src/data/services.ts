import {
  Activity, HeartPulse, BedDouble, Scissors, Microscope, ScanLine,
  Radio, Stethoscope, Eye, ClipboardList, Smile,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "Atención inmediata"
  | "Internación"
  | "Apoyo diagnóstico"
  | "Consulta"
  | "Atención odontológica";

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  icon: LucideIcon;
  summary: string;
  description: string;
  infrastructureTitle?: string;
  infrastructure?: string[];
  specialtiesTitle?: string;
  specialties?: string[];
}

export const services: ServiceDetail[] = [
  {
    slug: "urgencias",
    title: "Servicio de Urgencias",
    shortTitle: "Servicio de Urgencias",
    category: "Atención inmediata",
    icon: Activity,
    summary: "Atención integral, oportuna y humanizada las 24 horas para población adulta.",
    description:
      "El servicio de urgencias cuenta con un equipo multidisciplinario de profesionales altamente calificados para la atención de nuestra población adulta y con el fin de brindar una atención integral, oportuna y humanizada.",
    infrastructureTitle: "Contamos con una infraestructura adecuada para:",
    infrastructure: [
      "Consultorios de TRIAGE y de valoración adultos.",
      "Sala de reanimación con disponibilidad de equipo de respuesta inmediata las 24 horas del día.",
      "Zona de observación adultos.",
      "Cubículos de aislamiento.",
      "Sala de yesos e inmovilizaciones.",
      "Ambiente de transición de urgencias.",
    ],
  },
  {
    slug: "uci",
    title: "Unidad de Cuidados Intensivos e Intermedios",
    shortTitle: "Servicios de Internación",
    category: "Internación",
    icon: HeartPulse,
    summary:
      "Médicos internistas e intensivistas disponibles 24/7 para pacientes en condiciones críticas.",
    description:
      "La institución cuenta un amplio equipo de profesionales médicos especializados (Médicos Internistas e intensivistas), disponibles las 24 horas del día para la atención de nuestros pacientes adultos, con patologías de mediana y alta complejidad en condiciones críticas que requieren de monitoria continua y vigilancia estricta.",
    infrastructureTitle: "Contamos con una infraestructura adecuada para:",
    infrastructure: [
      "Cubículos de aislamiento en la Unidad de Cuidados Intensivos.",
      "Ascensores de transporte de pacientes.",
      "Zona Lila (entrega de información a familiares).",
      "Clínica de puertas abiertas que permite acompañante permanente.",
      "Central de monitoreo.",
    ],
  },
  {
    slug: "hospitalizacion",
    title: "Hospitalización",
    shortTitle: "Hospitalización",
    category: "Internación",
    icon: BedDouble,
    summary:
      "Habitaciones unipersonales para adultos, con un entorno cómodo para la recuperación.",
    description:
      "Contamos con un equipo multidisciplinario de profesionales comprometidos en brindar una atención segura, humanizada y de calidad a nuestros pacientes. En nuestra área de hospitalización, ofrecemos habitaciones unipersonales para la población adulta, proporcionando un entorno cómodo y adecuado para su proceso de recuperación.",
    infrastructureTitle: "Contamos con una infraestructura adecuada para:",
    infrastructure: [
      "Hospitalización adultos unipersonal.",
      "Cubículos de aislamiento en cada uno de los servicios.",
      "Clínica de puertas abiertas que permite acompañante permanente.",
    ],
  },
  {
    slug: "cirugia",
    title: "Cirugía",
    shortTitle: "Cirugía",
    category: "Internación",
    icon: Scissors,
    summary:
      "5 quirófanos y más de 10 especialidades médico-quirúrgicas con tecnología de vanguardia.",
    description:
      "Contamos con talento humano altamente calificado y equipos de última tecnología para prestar servicios quirúrgicos de mediana y alta complejidad. Disponemos de 5 quirófanos y más de 10 especialidades médico-quirúrgicas para la atención de nuestros pacientes.",
    specialtiesTitle: "Especialidades quirúrgicas:",
    specialties: [
      "Anestesiología.",
      "Cirugía general (Cirugía laparoscópica).",
      "Cirugía maxilofacial.",
      "Cirugía ortopédica.",
      "Cirugía reconstructiva.",
      "Cirugía artroscópica de rodilla y hombro.",
      "Cirugía de mano.",
      "Cirugía de columna.",
      "Cirugía plástica y estética.",
      "Cirugía de tórax.",
      "Neurocirugía.",
      "Cirugía urológica.",
      "Cirugía vascular y angiológica.",
      "Cirugía bariátrica.",
    ],
  },
  {
    slug: "laboratorio",
    title: "Laboratorio Clínico",
    shortTitle: "Laboratorio Clínico",
    category: "Apoyo diagnóstico",
    icon: Microscope,
    summary:
      "Servicios de apoyo diagnóstico oportunos, eficientes y confiables las 24 horas.",
    description:
      "Nuestro laboratorio cuenta con talento humano altamente capacitado durante las 24 horas y equipos de última tecnología, permitiéndonos ofrecer a nuestros usuarios servicios de apoyo diagnóstico oportunos, eficientes y confiables.",
    specialtiesTitle: "Servicios ofertados:",
    specialties: [
      "Química sanguínea.",
      "Función renal y hepática.",
      "Hematología y coagulación.",
      "Niveles de fármacos y toxicología.",
      "Serologías infecciosas.",
      "Marcadores cardíacos y tumorales.",
      "Uroanálisis.",
      "Estudios coprológicos y microbiología.",
      "Inmunología.",
      "Citologías intraoperatorias.",
      "Estudios histoquímicos e inmunohistoquímicos.",
    ],
  },
  {
    slug: "imagenes-diagnosticas",
    title: "Servicio de Imágenes Diagnósticas",
    shortTitle: "Imágenes Diagnósticas",
    category: "Apoyo diagnóstico",
    icon: ScanLine,
    summary:
      "14 radiólogos y equipos de última tecnología disponibles 24 horas al día.",
    description:
      "Contamos un grupo de 14 radiólogos altamente capacitados para realizar e interpretar diversos estudios imagenológicos sumado a equipos de última tecnología con disponibilidad 24 horas al día que nos permiten guiar un diagnóstico médico y una complementación terapéutica de forma confiable, oportuna, segura y de calidad.",
    specialtiesTitle: "Servicios ofertados:",
    specialties: [
      "Tomografía Axial Computarizada (TAC).",
      "Resonancia Magnética Nuclear (RMN).",
      "Rayos X.",
      "Radiología intervencionista.",
      "Ecografía.",
    ],
  },
  {
    slug: "hemodinamia",
    title: "Hemodinamia",
    shortTitle: "Hemodinamia",
    category: "Apoyo diagnóstico",
    icon: Radio,
    summary:
      "Procedimientos endovasculares de alta complejidad disponibles 24/7.",
    description:
      "Nuestra unidad de hemodinamia realiza procedimientos endovasculares de alta complejidad, disponibles 24/7, con equipo especializado y tecnología avanzada para una atención segura y de calidad.",
    specialtiesTitle: "Servicios ofertados:",
    specialties: [
      "Admisión de pacientes ambulatorios y hospitalizados.",
      "Preparación y recuperación de pacientes.",
      "Sala angiológica con angiógrafo de última generación (IA, 3D y visión 4K).",
      "Equipo especializado en neuroradiología, radiología intervencionista, cardiología, cirugía vascular, anestesiología y hemodinamia.",
    ],
  },
  {
    slug: "diagnostico-cardiovascular",
    title: "Diagnóstico Cardiovascular",
    shortTitle: "Diagnóstico Cardiovascular",
    category: "Apoyo diagnóstico",
    icon: Stethoscope,
    summary:
      "Procedimientos cardiológicos mínimamente invasivos para diagnóstico y tratamiento.",
    description:
      "Realizamos procedimientos cardiológicos mínimamente invasivos para el diagnóstico y tratamiento oportuno, con atención segura y de calidad.",
    specialtiesTitle: "Servicios ofertados:",
    specialties: [
      "Prueba de esfuerzo.",
      "Ecocardiogramas (estrés, transtorácico y transesofágico).",
      "Mesa basculante.",
      "Monitoreos Holter y MAPA.",
      "Electrocardiografía.",
    ],
  },
  {
    slug: "endoscopia",
    title: "Unidad de Endoscopia",
    shortTitle: "Unidad de Endoscopia",
    category: "Apoyo diagnóstico",
    icon: Eye,
    summary:
      "Procedimientos endoscópicos del tracto gastrointestinal y vías respiratorias.",
    description:
      "Nuestra unidad de endoscopia es un servicio en el cual se realizan procedimientos diagnóstico-terapéuticos endoscópicos del tracto gastrointestinal y de las vías respiratorias. Cuenta con un talento humano especializado altamente capacitado y tecnología de punta en un ambiente seguro que nos permite proporcionar una atención precisa, oportuna y de calidad a nuestros pacientes.",
  },
  {
    slug: "consulta-externa",
    title: "Consulta Externa",
    shortTitle: "Consulta Externa",
    category: "Consulta",
    icon: ClipboardList,
    summary:
      "20 consultorios y una sala de procedimientos para múltiples especialidades.",
    description:
      "El servicio de consulta externa ofrece múltiples especialidades médicas, con 20 consultorios y una sala de procedimientos, dotados con equipos e insumos para una atención humanizada y de calidad.",
    specialtiesTitle: "Especialidades ofertadas:",
    specialties: [
      "Anestesiología.",
      "Enfermería.",
      "Medicina general.",
      "Ortopedia y traumatología.",
      "Gastroenterología.",
      "Terapia física.",
      "Toma de muestras de laboratorio.",
      "Consultas especializadas: neurocirugía, cirugía general, urológica, bariátrica, vascular y angiológica.",
    ],
  },
  {
    slug: "odontologia",
    title: "Odontología",
    shortTitle: "Atención Odontológica",
    category: "Atención odontológica",
    icon: Smile,
    summary:
      "Atención odontológica especializada con tecnología de vanguardia y enfoque multidisciplinario.",
    description:
      "Brindamos atención odontológica especializada. Atendemos urgencias odontológicas como traumatismos, infecciones, dolor y fracturas, garantizando una respuesta oportuna y efectiva. Ofrecemos servicios especializados que incluyen endodoncia, cirugía oral y maxilofacial, implantología, rehabilitación oral y programas de prevención y mantenimiento para la salud bucal. Contamos con tecnología de vanguardia y un enfoque multidisciplinario que nos permite abordar casos complejos, priorizando la seguridad, el bienestar y la satisfacción de nuestros pacientes en un ambiente moderno y confortable.",
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}