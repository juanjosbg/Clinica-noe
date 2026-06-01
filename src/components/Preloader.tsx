import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      style={{
        backgroundImage: "linear-gradient(135deg, #0e3a4d 0%, #267794 100%)",
      }}
    >
      <div className="flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full" />
          <p className="text-2xl font-semibold tracking-normal text-white md:text-4xl xl:text-5xl px-10 p-5 uppercase">
            Cargando
            <span className="loading-dots" aria-hidden="true">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
