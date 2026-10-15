import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const IMAGES = [
  { src: 'https://i.imgur.com/7dTi44k.jpeg', cat: 'Kitchen', title: 'Granite Kitchen Counter' },
  { src: 'https://i.imgur.com/9uJGT7h.jpeg', cat: 'Commercial', title: 'Reception Counter Installation' },
  { src: 'https://i.imgur.com/lqogvWX.jpeg', cat: 'Bathroom', title: 'Marble Bathroom Vanity' },
  { src: 'https://i.imgur.com/bYZtqnQ.jpeg', cat: 'Kitchen', title: 'Premium Granite Surface' },
  { src: 'https://i.imgur.com/4QFhhOU.jpeg', cat: 'Wall Cladding', title: 'Marble Wall Feature' },
  { src: 'https://i.imgur.com/BYZAp69.jpeg', cat: 'Bathroom', title: 'Quartz Vanity Top' },
  { src: 'https://i.imgur.com/k8syAx0.jpeg', cat: 'Outdoor', title: 'Porcelain Cladding' },
  { src: 'https://i.imgur.com/rBPNMKo.jpeg', cat: 'Kitchen', title: 'Custom Kitchen Counter' },
];

const CATS = ['All', ...Array.from(new Set(IMAGES.map((i) => i.cat)))];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-scale-in' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<typeof IMAGES[0] | null>(null);

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter((i) => i.cat === filter);

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://i.imgur.com/lqogvWX.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-amber-400">Our Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Project Gallery</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-xl mx-auto mt-4">
            Browse our portfolio of completed stone installations — from kitchens to commercial spaces.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-10 bg-white border-b border-stone-100 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <Reveal key={item.src}>
                <div
                  className="gallery-item relative cursor-pointer rounded-2xl overflow-hidden shadow-sm group"
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-semibold">{item.title}</p>
                    <span className="text-amber-300 text-[10px]">{item.cat}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{lightbox.title}</p>
              <span className="text-amber-400 text-sm">{lightbox.cat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
