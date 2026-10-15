import { Calculator, FileText, TrendingUp, Building2, Receipt, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const SERVICES = [
  {
    icon: <Calculator size={28} />,
    title: 'Accounting & Bookkeeping',
    desc: 'Monthly bookkeeping, general ledger maintenance, bank reconciliations and management accounts so you always know where your business stands.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Tax Planning & Returns',
    desc: 'Personal and corporate income tax, provisional tax, tax planning strategies and full SARS eFiling support.',
  },
  {
    icon: <Receipt size={28} />,
    title: 'VAT & PAYE Compliance',
    desc: 'VAT registration, returns, PAYE, UIF and SDL submissions — kept accurate and on time.',
  },
  {
    icon: <Building2 size={28} />,
    title: 'Company Registration',
    desc: 'CIPC company registration, amendments, annual returns and director changes handled professionally.',
  },
  {
    icon: <Users size={28} />,
    title: 'Payroll Services',
    desc: 'Complete payroll processing, payslips, EMP201 and EMP501 submissions.',
  },
  {
    icon: <FileText size={28} />,
    title: 'Free PDF Editor & Converter',
    desc: 'View, annotate and convert PDFs to CSV online. Client-side processing keeps your documents private.',
  },
];

export default function Services() {
  return (
    <div className="page-enter pt-24 pb-16">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4">Our Services</h1>
          <p className="text-navy-100 max-w-2xl mx-auto">
            Comprehensive accounting, tax and digital tools designed for South African businesses and individuals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <SectionReveal key={s.title}>
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

          <div className="mt-14 text-center bg-navy-50 rounded-2xl p-8 border border-navy-100">
            <Shield className="mx-auto text-gold-500 mb-3" size={32} />
            <h3 className="text-xl font-bold text-navy-900 mb-2">Need a custom solution?</h3>
            <p className="text-slate-600 mb-5 max-w-lg mx-auto">
              We tailor packages for startups, SMEs and individuals. Get in touch for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
