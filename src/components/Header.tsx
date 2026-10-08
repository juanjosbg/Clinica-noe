import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { HeaderActions } from "@/components/HeaderActions";

const navItems = [
  { to: "/quienes-somos" as const, label: "Qui\u00e9nes somos" },
  { to: "/atencion" as const, label: "Atenci\u00f3n al paciente" },
  { to: "/servicios" as const, label: "Servicios" },
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
          ? "bg-white/90 py-4 shadow-soft backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link to="/" className="group flex items-center">
          <img
            src={scrolled ? "/Logo/Noe.png" : "/Logo/Noe-Blanco.png"}
            alt={"Cl\u00ednica No\u00e9"}
            className="h-12 w-auto max-w-[120px] sm:h-20 sm:max-w-[240px] transition-transform group-hover:scale-105 md:h-24 md:max-w-[360px]"
          />
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

        <HeaderActions scrolled={scrolled} />

        <button
          aria-label={"Men\u00fa"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full p-2 lg:hidden ${scrolled ? "text-[#267794]" : "text-white"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="mx-4 mt-3 animate-scale-in rounded-2xl bg-white/95 p-4 shadow-brand backdrop-blur lg:hidden">
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

          </nav>
        </div>
      )}
    </header>
  );
}
