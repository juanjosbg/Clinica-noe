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
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(16, 73, 95, 0.68), rgba(16, 73, 95, 0.68)), url('/Photos/Clinica-Noe2.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full" />
          <img
            src="/Logo/Noe-Blanco.png"
            alt="Clínica Noé"
            className="relative w-56 max-w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.28)] md:w-72"
          />
        </div>
      </div>
    </div>
  );
}
