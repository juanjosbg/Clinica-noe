import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { HeaderActions } from "@/components/HeaderActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ResultsMenu({
  scrolled = false,
  onNavigate,
}: {
  scrolled?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`group relative flex shrink-0 items-center justify-between gap-2 bg-transparent text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267794] ${
            onNavigate
              ? "rounded-xl px-4 py-3 text-foreground hover:bg-[#b4e3ed]/40 hover:text-[#267794]"
              : `${scrolled ? "text-foreground hover:text-[#267794]" : "text-white/95 hover:text-white"} after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:bg-[#80cee0] after:transition-all hover:after:w-full`
          }`}
        >
          Resultados
          <ChevronDown
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[340px] max-w-[calc(100vw-2rem)] rounded-lg border-slate-200 bg-white p-2 text-[#354584] shadow-lg"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-md px-4 py-3 focus:bg-[#b4e3ed]/40 focus:text-[#267794]"
        >
          <Link to="/historia-clinica" onClick={onNavigate}>
            Historias Clínicas
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-md px-4 py-3 focus:bg-[#b4e3ed]/40 focus:text-[#267794]"
        >
          <a
            href="https://clinicacolombiaes.imexhs.com/portal/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
          >
            Consulta y Descarga de resultados
            <span className="sr-only"> (abre en otra pestaña)</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const navItems = [
  { to: "/quienes-somos" as const, label: "Qui\u00e9nes somos" },
  { to: "/atencion" as const, label: "Atenci\u00f3n al paciente" },
  { to: "/servicios" as const, label: "Servicios" },
  { to: "/pqrs" as const, label: "PQRS" },
  { to: "/informacion-institucional" as const, label: "Información institucional" },
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
          ? "bg-white/90 py-3 shadow-soft backdrop-blur-md sm:py-4"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-2 px-4 sm:gap-6 sm:px-8 lg:px-10 2xl:gap-12 2xl:px-12">
        <Link to="/" className="group flex shrink-0 items-center">
          <img
            src={scrolled ? "/Logo/Noe.png" : "/Logo/Noe-Blanco.png"}
            alt={"Cl\u00ednica No\u00e9"}
            className="h-12 w-auto max-w-20 object-contain transition-transform group-hover:scale-105 sm:h-16 sm:max-w-40 xl:h-20 xl:max-w-48"
          />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 whitespace-nowrap xl:flex 2xl:gap-8"
        >
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
          <ResultsMenu scrolled={scrolled} />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-4 xl:ml-0">
          <HeaderActions scrolled={scrolled} />

          <button
            aria-label={"Men\u00fa"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full p-2 xl:hidden ${scrolled ? "text-[#267794]" : "text-white"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="mx-4 mt-3 max-h-[calc(100dvh-7rem)] animate-scale-in overflow-y-auto rounded-2xl bg-white/95 p-4 shadow-brand backdrop-blur sm:mx-8 xl:hidden"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
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
            <ResultsMenu onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}
