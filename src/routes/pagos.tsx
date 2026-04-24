import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CreditCard, Building2, Landmark, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/pagos")({
  head: () => ({
    meta: [
      { title: "Pagos — Clínica Noé" },
      { name: "description", content: "Conoce las opciones de pago disponibles para tus servicios médicos." },
      { property: "og:title", content: "Pagos — Clínica Noé" },
      { property: "og:description", content: "Pagos seguros, fáciles y ágiles." },
    ],
  }),
  component: Pagos,
});

const methods = [
  { icon: CreditCard, title: "Tarjeta de crédito/débito", desc: "Visa, Mastercard, American Express." },
  { icon: Building2, title: "PSE", desc: "Pagos seguros desde tu banco en línea." },
  { icon: Landmark, title: "Transferencia bancaria", desc: "Cuentas habilitadas en bancos nacionales." },
  { icon: ShieldCheck, title: "Pago seguro", desc: "Plataforma certificada y encriptada." },
];

function Pagos() {
  return (
    <>
      <PageHero
        eyebrow="Pagos"
        title="Pagos seguros"
        accent="y sin filas"
        description="Te ofrecemos múltiples opciones para que pagues tus servicios de manera fácil y segura."
      />
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-3xl bg-white p-7 text-center shadow-soft hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}