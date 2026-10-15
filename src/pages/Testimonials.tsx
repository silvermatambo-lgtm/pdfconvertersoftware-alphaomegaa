import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const REVIEWS = [
  {
    name: 'Sarah van der Merwe',
    location: 'Johannesburg',
    rating: 5,
    text: 'Alpha and Omega Advisors transformed our kitchen completely. The granite countertops are absolutely stunning — the quality of the stone and the precision of the installation are exceptional. Our kitchen is now the centrepiece of our home. Highly recommend!',
    project: 'Kitchen Countertops',
    avatar: 'SV',
  },
  {
    name: 'James Nkosi',
    location: 'Pretoria',
    rating: 5,
    text: 'We used Alpha and Omega Advisors for our office reception counter and the result is incredible. The marble gives the reception such a premium feel — clients always comment on how impressive it looks. The team was professional, punctual, and delivered on time.',
    project: 'Commercial Reception Counter',
    avatar: 'JN',
  },
  {
    name: 'Linda Botha',
    location: 'Sandton',
    rating: 5,
    text: 'I had quartz vanity tops installed in my two bathrooms and I am absolutely in love with the result. The finish is perfect, the seams are invisible, and the team cleaned up perfectly. Will definitely be using them again for my bar top.',
    project: 'Bathroom Vanities',
    avatar: 'LB',
  },
  {
    name: 'Michael Dlamini',
    location: 'Centurion',
    rating: 5,
    text: 'Outstanding service from start to finish. The team helped me choose the right stone for my bar top, the installation was flawless, and the price was very competitive. My guests can\'t stop talking about how impressive it looks. 10/10!',
    project: 'Bar Top',
    avatar: 'MD',
  },
  {
    name: 'Nomsa Khumalo',
    location: 'Randburg',
    rating: 5,
    text: 'I had a feature wall clad in marble behind my fireplace and the transformation is breathtaking. The team was incredibly skilled and took great care to ensure every tile was perfectly aligned. Professional, quality workmanship at a fair price.',
    project: 'Wall Cladding',
    avatar: 'NK',
  },
  {
    name: 'Peter Swanepoel',
    location: 'Midrand',
    rating: 5,
    text: 'Used Alpha and Omega Advisors for a large commercial kitchen project. The porcelain surfaces are exactly what we needed — durable, easy to clean, and they look fantastic. The project was completed on schedule with zero issues. Great company to deal with.',
    project: 'Commercial Kitchen',
    avatar: 'PS',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className={i < n ? 'fill-gold-400 text-gold-400' : 'text-stone-200'} />
      ))}
    </div>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const featured = REVIEWS[current];

  function prev() { setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length); }
  function next() { setCurrent((c) => (c + 1) % REVIEWS.length); }

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="relative py-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://i.imgur.com/rBPNMKo.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-gold-400">What Clients Say</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Client Testimonials</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-xl mx-auto mt-4">
            Real feedback from real clients — see why we're South Africa's trusted stone installation experts.
          </p>
        </div>
      </section>

      {/* Featured testimonial slider */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative bg-stone-50 rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-gold-200 text-[80px] leading-none font-serif select-none">"</div>

            <div className="relative text-center">
              <Stars n={featured.rating} />
              <p className="text-stone-600 text-base md:text-lg leading-relaxed mt-6 mb-8 italic">
                "{featured.text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-500 text-white font-bold text-lg flex items-center justify-center">
                  {featured.avatar}
                </div>
                <div className="text-left">
                  <p className="font-bold text-stone-800">{featured.name}</p>
                  <p className="text-stone-500 text-xs">{featured.location} · {featured.project}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-stone-200 hover:border-gold-400 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-2 bg-gold-500' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-stone-200 hover:border-gold-400 text-stone-400 hover:text-gold-500 flex items-center justify-center transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid reviews */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <span className="section-tag">All Reviews</span>
            <h2 className="section-heading text-center">What Our Clients Are Saying</h2>
            <div className="gold-bar mx-auto" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow h-full flex flex-col">
                  <Stars n={r.rating} />
                  <p className="text-stone-600 text-sm leading-relaxed mt-4 flex-1 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-50">
                    <div className="w-10 h-10 rounded-full bg-gold-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">{r.name}</p>
                      <p className="text-stone-400 text-xs">{r.location} · {r.project}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gold-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5.0', label: 'Average Rating' },
              { num: '500+', label: 'Happy Clients' },
              { num: '100%', label: 'Satisfaction Rate' },
              { num: '15+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white mb-1">{stat.num}</p>
                <p className="text-gold-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">Join Our Happy Clients</h2>
          <p className="text-stone-500 mb-8">Experience the quality and craftsmanship that our clients rave about.</p>
          <Link to="/contact" className="btn-gold">
            Request a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
