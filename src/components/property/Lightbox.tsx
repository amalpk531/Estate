import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Photo } from "@/lib/properties";

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export function Lightbox({ photos, index, onClose, onIndexChange }: Props) {
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => onIndexChange((index + 1) % photos.length),
    [index, photos.length, onIndexChange],
  );
  const prev = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      onTouchStart={(e) => (touchStartX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 text-on-overlay">
        <span className="text-sm font-medium">
          {index + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="rounded-full p-2 transition-colors hover:bg-on-overlay/15"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 pb-6">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 rounded-full bg-on-overlay/10 p-3 text-on-overlay transition-colors hover:bg-on-overlay/25 sm:left-6"
        >
          <ChevronLeft className="size-6" />
        </button>

        <figure className="max-h-full text-center">
          <img
            src={photo.url}
            alt={photo.caption}
            className="max-h-[75vh] w-auto rounded-lg object-contain"
          />
          <figcaption className="mt-3 text-sm text-on-overlay/80">{photo.caption}</figcaption>
        </figure>

        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 rounded-full bg-on-overlay/10 p-3 text-on-overlay transition-colors hover:bg-on-overlay/25 sm:right-6"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
