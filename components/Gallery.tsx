import Image from "next/image";
import Reveal from "./Reveal";

const shots = [
  {
    src: "/photos/hero-gym.jpg",
    alt: "Sala principal de entrenamiento",
    caption: "Sala principal",
    span: "md:col-span-4 md:row-span-2",
  },
  {
    src: "/photos/pesas.jpg",
    alt: "Zona de peso libre con mancuernas",
    caption: "Peso libre",
    span: "md:col-span-2",
  },
  {
    src: "/photos/cafe.jpg",
    alt: "Cafetería y zona social",
    caption: "Zona social y cafetería",
    span: "md:col-span-2",
  },
  {
    src: "/photos/barra.jpg",
    alt: "Plataforma de halterofilia",
    caption: "Plataformas",
    span: "md:col-span-2",
  },
  {
    src: "/photos/fisioterapia.jpg",
    alt: "Consulta de fisioterapia",
    caption: "Consultas",
    span: "md:col-span-2",
  },
  {
    src: "/photos/fuerza.jpg",
    alt: "Zona funcional de fuerza",
    caption: "Zona funcional",
    span: "md:col-span-2",
  },
  {
    src: "/photos/mancuernas.jpg",
    alt: "Detalle de la fila de mancuernas",
    caption: "El detalle importa",
    span: "md:col-span-2",
  },
  {
    src: "/photos/grupal.jpg",
    alt: "Sala de clases en grupos reducidos",
    caption: "Grupos reducidos · máx. 6",
    span: "md:col-span-4",
  },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.3em] text-brand">
          LAS INSTALACIONES
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
          Un espacio que se siente hogar.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Sala de entrenamiento, consultas, zona social y cafetería: cada
          rincón está pensado para que entrenar, recuperarte o simplemente
          quedarte un rato más sea un placer.
        </p>
      </Reveal>
      <div className="mt-12 grid auto-rows-[210px] grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[230px]">
        {shots.map((s, i) => (
          <Reveal
            key={s.src}
            delay={(i % 3) * 90}
            className={`group relative overflow-hidden rounded-3xl ${s.span}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="absolute bottom-4 left-5 text-sm font-semibold text-white drop-shadow">
              {s.caption}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
