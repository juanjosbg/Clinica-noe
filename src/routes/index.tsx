import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useReveal } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
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

const stats: { value: number; suffix: string; label: string; literal?: string }[] = [
  { value: 25, suffix: "+", label: "Años de experiencia" },
  { value: 150, suffix: "+", label: "Especialistas" },
  { value: 98, suffix: "%", label: "Satisfacción" },
  { value: 24, suffix: "/7", label: "Atención" },
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
  const { ref, visible } = useReveal(0.15);
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
  const { ref, visible } = useReveal(0.1);
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
  const { ref, visible } = useReveal(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-deep py-20 text-white">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#80cee0]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#b4e3ed]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  visible,
}: {
  stat: { value: number; suffix: string; label: string };
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, visible, 1800 + index * 150);
  return (
    <div
      className={`text-center transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <p className="text-5xl font-bold !text-white md:text-6xl">
        <span className="bg-gradient-to-r from-[#b4e3ed] to-[#80cee0] bg-clip-text text-transparent tabular-nums">
          {count}
          {stat.suffix}
        </span>
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/70">{stat.label}</p>
    </div>
  );
}

function PatientPortal() {
  const { ref, visible } = useReveal(0.15);
  const resources = [
    { icon: FileText, title: "Resultados de exámenes", desc: "Consulta y descarga tus resultados de laboratorio." },
    { icon: CalendarCheck, title: "Agenda tus citas", desc: "Programa, modifica o cancela tus citas en línea." },
    { icon: UserCircle2, title: "Historia clínica", desc: "Accede a tu información médica de forma segura." },
  ];
  return (
    <section ref={ref} className="bg-[#f3f4f6] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className={visible ? "animate-slide-in-left" : "opacity-0"}>
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`rounded-3xl bg-white p-6 shadow-soft hover-lift ${
                  i === 0 ? "sm:col-span-2 sm:bg-gradient-brand sm:text-white" : ""
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    i === 0 ? "bg-white/20 text-white sm:text-white" : "bg-[#b4e3ed]/40 text-[#267794]"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className={`mt-4 text-lg ${i === 0 ? "sm:!text-white" : ""}`}>{title}</h3>
                <p className={`mt-1 text-sm ${i === 0 ? "sm:text-white/85" : "text-muted-foreground"}`}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={visible ? "animate-slide-in-right delay-200" : "opacity-0"}>
          <h2 className="text-4xl text-[#267794] md:text-5xl">Portal del paciente</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Hemos creado recursos especiales para ti y tu familia, con{" "}
            <strong className="font-semibold text-foreground">
              información clara y útil para acompañarte en cada etapa de tu cuidado.
            </strong>
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#267794]/40 px-7 py-3 text-sm font-semibold text-[#267794] transition-all hover:bg-[#267794] hover:text-white"
          >
            <BookOpen className="h-4 w-4" /> Ver biblioteca
          </a>
        </div>
      </div>
    </section>
  );
}

function PatientExperience() {
  const { ref, visible } = useReveal(0.2);
  return (
    <section ref={ref} className="bg-background px-4 py-12 sm:px-6">
      <div
        className={`mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#267794] to-[#1f5f78] px-8 py-16 text-white shadow-brand sm:px-14 lg:px-20 ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl !text-white md:text-5xl">
              Contamos<br />contigo para seguir<br />creciendo
            </h2>
            <p className="mt-6 text-base text-white/85">
              Lo que piensas, vale. Tu experiencia, aún más.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-white/90">
              Comparte tu opinión (PQSRF), es importante para seguir construyendo un servicio
              de calidad, centrado en tus necesidades y las de tu familia. Juntos, hacemos de
              cada experiencia una oportunidad para mejorar.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#267794]"
            >
              <MessageCircle className="h-4 w-4" /> Experiencia del Paciente
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, visible } = useReveal(0.2);
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