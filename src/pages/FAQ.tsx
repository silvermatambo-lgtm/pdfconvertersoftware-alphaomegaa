import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const FAQS = [
  {
    q: 'What types of stone do you supply and install?',
    a: 'We work with four premium stone types: Granite (natural igneous rock — extremely durable and unique), Marble (timeless natural stone with beautiful veining), Quartz (engineered stone — consistent in colour, non-porous), and Porcelain (extremely hard ceramic — great for large format applications). Each material has unique properties and we help you choose the best option for your project.',
  },
  {
    q: 'What applications can stone be used for?',
    a: 'Stone is incredibly versatile. We install countertops for kitchens and bathrooms, bar tops, reception counter tops, wall cladding (interior and exterior), bathroom vanities, fireplace surrounds, staircase treads, and custom commercial installations. If you have a unique project in mind, contact us for a consultation.',
  },
  {
    q: 'How long does installation take?',
    a: 'A standard kitchen countertop installation typically takes 1–2 days after the stone has been fabricated. Fabrication (cutting, edging, polishing) usually takes 5–7 working days after your template has been taken. Larger or more complex projects like wall cladding or commercial fit-outs may take longer. We will always give you a clear timeline before work begins.',
  },
  {
    q: 'Do you provide a free quote?',
    a: 'Yes! We offer free, no-obligation quotes. Simply contact us via phone, WhatsApp, or our online form with your project details (type of stone, application, approximate dimensions) and we will provide a detailed quote. For complex projects, we may need to visit the site to take accurate measurements.',
  },
  {
    q: 'How do I care for my stone surfaces?',
    a: 'Most stone surfaces are sealed during installation to protect against staining. For daily cleaning, use a mild, pH-neutral cleaner and a soft cloth. Avoid harsh chemicals, abrasive cleaners, or anything acidic (like vinegar or lemon juice) as these can damage the surface. Granite and marble should be resealed annually. Quartz and porcelain require minimal maintenance.',
  },
  {
    q: 'Can you match existing stone or do custom colours?',
    a: 'We carry a wide range of stone slabs and can often source specific colours, patterns, or varieties on request. While no two natural stone slabs are identical, we can help you find something very close to an existing stone. For engineered stones like quartz, colour matching is much more precise. Bring photos or samples to your consultation.',
  },
  {
    q: 'Do you work on commercial projects?',
    a: 'Absolutely. We regularly undertake commercial projects including office reception counters, hotel lobbies, restaurant bars and counters, medical and salon reception desks, retail fit-outs, and large-scale wall cladding. We are experienced in working within commercial timelines and can accommodate after-hours installation to minimise disruption.',
  },
  {
    q: 'Is there a warranty on your installations?',
    a: 'Yes. We stand behind our workmanship and offer a warranty on all installations. The specific terms depend on the type of stone and the application. We will provide full warranty details before work begins. Our goal is your complete satisfaction — if there\'s ever an issue, we will resolve it promptly.',
  },
  {
    q: 'What areas do you service?',
    a: 'We service clients across South Africa. While our primary service area is centred around our base of operations, we are happy to discuss projects further afield. Contact us with your location and project details and we will advise on availability and any travel costs involved.',
  },
  {
    q: 'How do I get started?',
    a: 'Getting started is easy! Call us on 083 352 2647 or WhatsApp us on +27 78 300 7127, send an email to Info@granite-installations.co.za, or fill in our online quote form. We\'ll arrange a consultation to discuss your project, take measurements if needed, and provide a detailed quote. From there, we handle everything through to the finished installation.',
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'border-gold-300 shadow-md' : 'border-stone-200'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
      >
        <span className={`font-semibold text-sm md:text-base leading-snug ${open ? 'text-gold-600' : 'text-stone-800'}`}>{q}</span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? 'bg-gold-500 text-white' : 'bg-stone-100 text-stone-500'}`}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
          {a}
        </div>
      )}
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

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="relative py-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://i.imgur.com/bYZtqnQ.jpeg)', backgroundSize: 'cover' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-gold-400">Have Questions?</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-xl mx-auto mt-4">
            Everything you need to know about our stone installation services.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i}>
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-stone-50 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">Still have questions?</h2>
          <p className="text-stone-500 mb-8">We're happy to help. Reach out to us directly and we'll answer all your questions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+27833522647" className="btn-gold">
              Call Us Now
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold-500 text-gold-600 font-semibold rounded-lg hover:bg-gold-50 transition-colors text-sm">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
