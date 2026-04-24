import aboutHero from "@/assets/about-hero.jpg";

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image = aboutHero,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" width={1920} height={900} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e3a4d]/85 via-[#0e3a4d]/60 to-[#267794]/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 pt-28">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-[#80cee0]" /> {eyebrow}
          </span>
          <h1 className="mt-5 text-5xl !text-white md:text-7xl animate-fade-in-up delay-200">
            {title}{" "}
            {accent && (
              <span className="bg-gradient-to-r from-[#b4e3ed] to-[#80cee0] bg-clip-text text-transparent">
                {accent}
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 animate-fade-in-up delay-300">{description}</p>
        </div>
      </div>
    </section>
  );
}