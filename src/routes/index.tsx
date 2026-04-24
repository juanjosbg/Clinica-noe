import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useReveal } from "@/hooks/useReveal";
import {
  Heart, Stethoscope, Activity, Baby, Brain, Eye, Bone, Microscope,
  ShieldCheck, Award, Users, Clock, ArrowRight, BookOpen, MessageCircle,
  FileText, CalendarCheck, UserCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clínica Noé — Hospital de excelencia" },
      { name: "description", content: "Servicios médicos integrales: urgencias 24/7, especialidades, cirugía y más." },
      { property: "og:title", content: "Clínica Noé — Hospital de excelencia" },
      { property: "og:description", content: "Servicios médicos integrales con tecnología de vanguardia y atención humanizada." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Heart, title: "Cardiología", desc: "Diagnóstico y tratamiento integral del corazón." },
  { icon: Baby, title: "Pediatría", desc: "Cuidado especializado para los más pequeños." },
  { icon: Brain, title: "Neurología", desc: "Atención avanzada del sistema nervioso." },
  { icon: Bone, title: "Ortopedia", desc: "Recuperación funcional y traumatología." },
  { icon: Eye, title: "Oftalmología", desc: "Salud visual con equipos de última generación." },
  { icon: Microscope, title: "Laboratorio", desc: "Análisis clínicos precisos y oportunos." },
  { icon: Stethoscope, title: "Medicina interna", desc: "Atención integral del adulto." },
  { icon: Activity, title: "Urgencias 24/7", desc: "Respuesta inmediata cuando más lo necesitas." },
];

const stats = [
  { value: "25+", label: "Años de experiencia" },
  { value: "150+", label: "Especialistas" },
  { value: "98%", label: "Satisfacción" },
  { value: "24/7", label: "Atención" },
];

function Index() {
  return (
    <>
      <HeroCarousel />
      <div className="hidden h-32 lg:block" />
      <Welcome />
      <Services />
      <Stats />
      <PatientPortal />
      <PatientExperience />
      <CTA />
    </>
  );
}

function Welcome() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className={visible ? "animate-slide-in-left" : "opacity-0"}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#b4e3ed]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#267794]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#267794]" /> Bienvenidos
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl">
              Una clínica donde la <span className="text-gradient-brand">vida</span> es nuestra prioridad
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              En Clínica Noé combinamos experiencia médica, tecnología avanzada y un trato humano excepcional para ofrecerte atención integral en cada etapa de tu vida.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, label: "Acreditación de calidad" },
                { icon: Award, label: "Reconocimiento nacional" },
                { icon: Users, label: "Equipo multidisciplinario" },
                { icon: Clock, label: "Disponibilidad 24/7" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={visible ? "animate-slide-in-right delay-200" : "opacity-0"}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-brand opacity-30 blur-2xl" />
              <div className="relative grid gap-4">
                <div className="rounded-3xl bg-white p-8 shadow-brand hover-lift">
                  <Heart className="h-10 w-10 text-[#267794]" />
                  <h3 className="mt-4 text-2xl">Atención humanizada</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cada paciente recibe atención personalizada centrada en su bienestar físico y emocional.
                  </p>
                </div>
                <div className="ml-12 rounded-3xl bg-gradient-brand p-8 text-white shadow-brand hover-lift">
                  <Activity className="h-10 w-10" />
                  <h3 className="mt-4 text-2xl !text-white">Tecnología de punta</h3>
                  <p className="mt-2 text-sm text-white/85">
                    Equipos de última generación que respaldan diagnósticos precisos y tratamientos efectivos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, visible } = useReveal();
  return (
    <section id="servicios" ref={ref} className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mx-auto max-w-2xl text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#b4e3ed]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#267794]">
            Servicios
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl">
            Especialidades <span className="text-gradient-brand">médicas</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Más de 30 especialidades para cuidar a toda la familia.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-white p-7 hover-lift ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#b4e3ed]/0 transition-all duration-500 group-hover:bg-[#b4e3ed]/40" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-soft">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="relative mt-5 text-xl">{title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#267794] opacity-0 transition-opacity group-hover:opacity-100">
                Ver más <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-deep py-20 text-white">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#80cee0]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#b4e3ed]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center ${visible ? "animate-scale-in" : "opacity-0"}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <p className="text-5xl font-bold !text-white md:text-6xl">
              <span className="bg-gradient-to-r from-[#b4e3ed] to-[#80cee0] bg-clip-text text-transparent">
                {s.value}
              </span>
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-gradient-soft py-24" id="agenda">
      <div className={`mx-auto max-w-5xl px-6 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-5xl">
          ¿Listo para agendar <span className="text-gradient-brand">tu cita?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Contáctanos y te asignaremos la mejor atención con nuestros especialistas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-105">
            Agendar ahora <ArrowRight className="h-4 w-4" />
          </a>
          <a href="tel:+576000000" className="inline-flex items-center gap-2 rounded-full border-2 border-[#267794]/30 px-8 py-4 text-sm font-semibold text-[#267794] transition-colors hover:bg-[#b4e3ed]/30">
            Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}