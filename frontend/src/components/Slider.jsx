import { useState } from "react";

function Slider({ images = [] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [open, setOpen] = useState(false);

  const next = () => {
    setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1));
  };

  const prev = () => {
    setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  return (
    <>
      {/* WRAPPER (IMPORTANT: prevents layout overflow) */}
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">

        {/* MAIN IMAGE */}
        <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] bg-gray-100">

          <img
            src={images?.[activeImage] || "/no-image.png"}
            alt=""
            className="w-full h-full object-contain"
          />

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* COUNTER */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {activeImage + 1} / {images.length}
          </div>

          {/* FULLSCREEN BTN */}
          <button
            onClick={() => setOpen(true)}
            className="absolute top-4 right-4 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-xl shadow"
          >
            Full View
          </button>

          {/* NAV */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
              >
                ←
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS (SAFE GRID - NO OVERFLOW) */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2 p-3 bg-white">

            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-16 rounded-lg overflow-hidden border transition
                  ${activeImage === i
                    ? "border-black scale-[1.02]"
                    : "border-gray-200 opacity-70"
                  }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

          </div>
        )}
      </div>

      {/* FULLSCREEN (ISOLATED - NO PARENT COLLISION) */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">

          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ×
          </button>

          <button
            onClick={prev}
            className="absolute left-5 text-white text-3xl"
          >
            ←
          </button>

          <img
            src={images?.[activeImage]}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={next}
            className="absolute right-5 text-white text-3xl"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}

export default Slider;