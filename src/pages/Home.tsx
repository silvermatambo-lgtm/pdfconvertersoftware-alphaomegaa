import { Link } from 'react-router-dom';
import { Calculator, FileText, Shield, TrendingUp, CheckCircle, ArrowRight, Phone, Users, Clock, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function SectionReveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? `animate-fade-up ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a227 0%, transparent 50%)' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
              Professional Accountants & Tax Advisors
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
              Alpha and Omega Advisors
            </h1>
            <p className="text-lg md:text-xl text-navy-100 mb-8 max-w-2xl leading-relaxed">
              Expert accounting, tax planning and compliance services — plus free professional PDF tools to help you manage documents with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/pdf-editor"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <FileText size={18} /> Open PDF Editor
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all"
              >
                Get a Free Consultation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-navy-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={20} />, label: 'SARS Registered' },
              { icon: <Users size={20} />, label: 'Trusted Advisors' },
              { icon: <Clock size={20} />, label: 'Timely Filing' },
              { icon: <Award size={20} />, label: 'Professional Service' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-white">
                <span className="text-gold-400">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services highlight */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionReveal className="text-center mb-14">
            <span className="inline-block text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 font-serif">Our Core Services</h2>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded" />
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Calculator size={28} />,
                title: 'Accounting & Bookkeeping',
                desc: 'Accurate monthly bookkeeping, financial statements and management reports tailored to your business.',
              },
              {
                icon: <TrendingUp size={28} />,
                title: 'Tax Planning & Compliance',
                desc: 'Personal and corporate tax returns, VAT, PAYE, provisional tax and strategic tax planning.',
              },
              {
                icon: <FileText size={28} />,
                title: 'Free PDF Tools',
                desc: 'View, annotate and convert PDFs to CSV online — private, secure and completely free for clients.',
              },
            ].map((s, i) => (
              <SectionReveal key={s.title} delay={`delay-${(i + 1) * 100}`}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 rounded-xl bg-navy-100 text-navy-800 flex items-center justify-center mb-5">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-navy-800 font-semibold hover:text-gold-600 transition-colors">
              View all services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PDF Editor CTA */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-3">
              Free Professional PDF Editor
            </h2>
            <p className="text-navy-100">
              Upload any PDF, add text annotations, download the edited file, or convert text content to CSV. Everything runs in your browser — your documents stay private.
            </p>
          </div>
          <Link
            to="/pdf-editor"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg transition-all shadow-lg"
          >
            <FileText size={18} /> Launch PDF Editor
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <span className="inline-block text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Why Choose Us</span>
              <h2 className="text-3xl font-bold text-navy-900 font-serif mb-6">Trusted Advisors for Businesses & Individuals</h2>
              <ul className="space-y-4">
                {[
                  'Experienced professional accountants and tax practitioners',
                  'Clear communication and transparent pricing',
                  'Timely SARS submissions and compliance support',
                  'Practical tools (including free PDF editor) for everyday efficiency',
                  'Personalised service tailored to your unique needs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-gold-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
            <SectionReveal delay="delay-200">
              <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Ready to get started?</h3>
                <p className="text-slate-600 mb-6">
                  Whether you need bookkeeping, tax advice or just a reliable PDF tool, we are here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white font-medium rounded-lg hover:bg-navy-800 transition"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="tel:+27000000000"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy-300 text-navy-800 font-medium rounded-lg hover:bg-navy-50 transition"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
