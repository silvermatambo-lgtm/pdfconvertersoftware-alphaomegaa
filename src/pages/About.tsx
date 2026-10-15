import { Target, Eye, Heart, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="page-enter pt-24 pb-16">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4">About Us</h1>
          <p className="text-navy-100 max-w-2xl mx-auto">
            Alpha and Omega Advisors — Professional Accountants and Tax Advisors committed to clarity, compliance and client success.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <SectionReveal>
              <img src="/logo.jpg" alt="Alpha and Omega Advisors" className="w-48 mx-auto md:mx-0 rounded-xl shadow-lg" />
            </SectionReveal>
            <SectionReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 font-serif mb-4">Who We Are</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Alpha and Omega Advisors is a professional accounting and tax advisory practice dedicated to helping businesses and individuals navigate South African tax and compliance with confidence.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We combine traditional accounting expertise with practical digital tools — including a free online PDF editor — so our clients can work smarter every day.
              </p>
            </SectionReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Target size={28} />, title: 'Our Mission', text: 'To deliver accurate, timely and transparent accounting and tax services that empower our clients to make informed decisions.' },
              { icon: <Eye size={28} />, title: 'Our Vision', text: 'To be the trusted advisor of choice for SMEs and individuals seeking reliable financial guidance and modern tools.' },
              { icon: <Heart size={28} />, title: 'Our Values', text: 'Integrity, professionalism, confidentiality and a genuine commitment to our clients’ long-term success.' },
            ].map((item) => (
              <SectionReveal key={item.title}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-navy-100 text-navy-800 flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Why clients choose us</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  'Qualified and experienced practitioners',
                  'Clear, jargon-free communication',
                  'On-time SARS submissions',
                  'Transparent and fair pricing',
                  'Personalised attention',
                  'Free digital tools for everyday efficiency',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="text-gold-500 shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
