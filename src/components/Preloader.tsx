import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-deep transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-brand">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#267794]" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-wide text-white">Clínica Noé</p>
          <p className="mt-1 text-sm text-[#b4e3ed]">Cuidamos lo que más amas</p>
        </div>
      </div>
    </div>
  );
}