import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
  { to: "/quienes-somos" as const, label: "Quiénes somos" },
  { to: "/atencion" as const, label: "Atención al paciente" },
  { to: "/servicios" as const, label: "Servicios" },
  { to: "/internacional" as const, label: "Oficina Internacional" },
  { to: "/pagos" as const, label: "Pagos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand shadow-soft transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className={`text-lg font-bold tracking-tight ${scrolled ? "text-[#267794]" : "text-white drop-shadow"}`}>
              Clínica Noé
            </p>
            <p className={`text-[10px] uppercase tracking-[0.18em] ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
              Cuidamos lo que amas
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-[#267794]" }}
              className={`relative text-sm font-medium transition-colors ${
                scrolled ? "text-foreground hover:text-[#267794]" : "text-white/95 hover:text-white"
              } after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:bg-[#80cee0] after:transition-all hover:after:w-full`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+576000000"
          className="hidden items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 lg:flex"
        >
          <Phone className="h-4 w-4" />
          Línea 24/7
        </a>

        <button
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden rounded-full p-2 ${scrolled ? "text-[#267794]" : "text-white"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-3 rounded-2xl bg-white/95 p-4 shadow-brand backdrop-blur animate-scale-in">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#b4e3ed]/40 hover:text-[#267794]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+576000000"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Línea 24/7
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}