import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-deep text-white">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#80cee0]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#b4e3ed]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="#267794" strokeWidth="2.5" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
            </div>
            <p className="text-xl font-bold">Clínica Noé</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Atención médica de excelencia con tecnología de vanguardia y un equipo humano comprometido con tu bienestar.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#80cee0] hover:text-[#0e3a4d]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base !text-white">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/" className="hover:text-[#80cee0]">Inicio</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-[#80cee0]">Quiénes somos</Link></li>
            <li><Link to="/servicios" className="hover:text-[#80cee0]">Servicios</Link></li>
            <li><Link to="/atencion" className="hover:text-[#80cee0]">Atención al paciente</Link></li>
            <li><Link to="/internacional" className="hover:text-[#80cee0]">Oficina Internacional</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base !text-white">Servicios</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>Urgencias 24/7</li>
            <li>Cirugía especializada</li>
            <li>Cuidado materno-infantil</li>
            <li>Cardiología</li>
            <li>Imágenes diagnósticas</li>
          </ul>
        </div>

        <div>
          <h4 className="text-base !text-white">Contáctanos</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[#80cee0]" /> Av. Principal #123, Cali — Colombia</li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[#80cee0]" /> +57 (60) 000 0000</li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[#80cee0]" /> contacto@clinicanoe.com</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Clínica Noé. Todos los derechos reservados.</p>
          <p>Habilitada para prestar servicios de salud.</p>
        </div>
      </div>
    </footer>
  );
}