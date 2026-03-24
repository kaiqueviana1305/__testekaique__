import { Carousel } from '../components/Carousel/Carousel';

export function CarouselPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
          Preview de Postagem
        </p>
        <h1 className="mt-1 text-lg font-black text-white tracking-tight">
          Carrossel — Agência Seppala
        </h1>
      </div>

      <div className="w-full max-w-sm">
        <Carousel />
      </div>

      <p className="mt-8 text-xs text-gray-700 text-center">
        Use as setas, dots ou swipe para navegar · Teclado: ← →
      </p>
    </div>
  );
}
