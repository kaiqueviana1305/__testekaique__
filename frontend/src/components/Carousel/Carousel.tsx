import { useState, useEffect, useRef, useCallback } from 'react';
import { slides } from './carouselData';
import { CarouselSlide } from './CarouselSlide';

const AUTOPLAY_INTERVAL = 4000;

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, next]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Touch / swipe
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      {/* Frame do carrossel — proporção quadrada 1:1 estilo Instagram */}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
        style={{ aspectRatio: '1 / 1' }}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track deslizante */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ width: `${total * 100}%`, transform: `translateX(-${(current * 100) / total}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} style={{ width: `${100 / total}%` }} className="h-full flex-shrink-0">
              <CarouselSlide slide={slide} total={total} />
            </div>
          ))}
        </div>

        {/* Botão anterior */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-100 opacity-40"
          style={{ backgroundColor: '#00000066' }}
          aria-label="Slide anterior"
        >
          ‹
        </button>

        {/* Botão próximo */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-100 opacity-40"
          style={{ backgroundColor: '#00000066' }}
          aria-label="Próximo slide"
        >
          ›
        </button>
      </div>

      {/* Dots de navegação */}
      <div className="flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              backgroundColor: i === current ? '#E30613' : '#ffffff33',
            }}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Botão play/pause */}
      <button
        onClick={() => setIsPlaying((p) => !p)}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
      >
        {isPlaying ? '⏸ Pausar' : '▶ Reproduzir'} auto-play
      </button>
    </div>
  );
}
