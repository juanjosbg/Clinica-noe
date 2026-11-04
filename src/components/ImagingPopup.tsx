import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function ImagingPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#03172e]/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-fit max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl outline-none">
          <Dialog.Title className="sr-only">Servicios de Imágenes Diagnósticas</Dialog.Title>
          <Dialog.Description className="sr-only">Resonancia magnética, ecografía y Doppler, tomografía y rayos X. Lunes a jueves: 7:30 a. m. a 5:00 p. m. Viernes: 7:00 a. m. a 4:00 p. m. Contacto: imagenes@clinicanoe.com.co. WhatsApp: 316 478 1506.</Dialog.Description>
          <img src="/images/popup/popup-img-diag.jpeg" alt="Conoce los servicios, horarios y canales de contacto de Imágenes Diagnósticas de Clínica Noé." width={1080} height={1350} className="block max-h-[calc(100dvh-48px)] w-auto max-w-full rounded-xl object-contain" />
          <Dialog.Close aria-label="Cerrar anuncio de Imágenes Diagnósticas" className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0e3a4d] text-white shadow-lg transition hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <X aria-hidden="true" className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
