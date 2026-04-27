import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "Excelencia médica",
    title: "Cuidamos tu salud",
    accent: "con el corazón",
    text: "Más de 25 años brindando atención integral con calidez humana y tecnología de vanguardia.",
    cta: "Agenda tu cita",
  },
  {
    image: hero2,
    eyebrow: "Atención humanizada",
    title: "Especialistas",
    accent: "que escuchan",
    text: "Un equipo multidisciplinario comprometido con tu bienestar y el de tu familia.",
    cta: "Conoce nuestros médicos",
  },
  {
    image: hero3,
    eyebrow: "Tecnología de punta",
    title: "Diagnósticos precisos,",
    accent: "tratamientos efectivos",
    text: "Equipos de última generación que respaldan la calidad de cada procedimiento.",
    cta: "Ver servicios",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover ${i === index ? "animate-ken-burns" : ""}`}
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e3a4d]/85 via-[#0e3a4d]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a4d]/70 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div key={index} className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-[#80cee0]" />
            {slides[index].eyebrow}
          </span>
          <h1 className="mt-6 text-5xl leading-[1.05] !text-white md:text-7xl animate-fade-in-up delay-200">
            {slides[index].title}{" "}
            <span className="bg-gradient-to-r from-[#b4e3ed] to-[#80cee0] bg-clip-text text-transparent">
              {slides[index].accent}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 animate-fade-in-up delay-300">
            {slides[index].text}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-in-up delay-500">
            <a
              href="#agenda"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#267794] shadow-brand transition-all hover:scale-105"
            >
              {slides[index].cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/20 md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/20 md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Floating quick actions */}
      <div className="absolute bottom-0 left-1/2 z-30 hidden w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-6 lg:block">
        <div className="grid grid-cols-3 overflow-hidden rounded-3xl bg-gradient-deep shadow-brand">
          {[
            { title: "Agenda tu cita", desc: "De forma fácil, ágil y segura", cta: "Agendar", href: "#agenda" },
            { title: "Portal de resultados", desc: "Consulta y descarga en línea", cta: "Ingresar", href: "#" },
            {
              title: "Portafolio",
              desc: "Conoce nuestra oferta institucional",
              cta: "Ingresar",
              href: "/Portafolios/PORTAFOLIO-NOE-2026.pdf",
            },
          ].map((it, i) => (
            <div key={i} className={`p-7 ${i < 2 ? "border-r border-white/10" : ""}`}>
              <p className="text-xl font-semibold text-white">
                {it.title.split(" ")[0]}{" "}
                <span className="text-[#80cee0]">{it.title.split(" ").slice(1).join(" ")}</span>
              </p>
              <p className="mt-1 text-sm text-white/70">{it.desc}</p>
              <a
                href={it.href}
                target={it.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={it.href.endsWith(".pdf") ? "noreferrer" : undefined}
                className="mt-4 inline-flex rounded-full border border-[#80cee0]/60 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#80cee0] hover:text-[#0e3a4d]"
              >
                {it.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
