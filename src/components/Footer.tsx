import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const WA_ICON = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Alpha and Omega Advisors" className="h-14 w-14 object-contain rounded bg-white p-0.5" />
              <div>
                <p className="text-white font-bold text-base leading-tight font-serif">Alpha and Omega</p>
                <p className="text-gold-400 text-[10px] tracking-widest uppercase">Advisors</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Professional Accountants and Tax Advisors. Expert guidance for businesses and individuals, plus free PDF tools.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/27000000000" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-navy-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                <WA_ICON />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 pb-2 border-b border-navy-700">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Services', '/services'],
                ['PDF Editor', '/pdf-editor'],
                ['FAQ', '/faq'],
                ['Testimonials', '/testimonials'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold-500 group-hover:w-2 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 pb-2 border-b border-navy-700">Our Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Bookkeeping & Accounting</li>
              <li>Tax Returns & Planning</li>
              <li>VAT & PAYE Compliance</li>
              <li>Company Registration</li>
              <li>Financial Statements</li>
              <li>PDF Editor & CSV Tools</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 pb-2 border-b border-navy-700">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <a href="tel:+27000000000" className="text-slate-400 hover:text-gold-400">+27 00 000 0000</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <a href="mailto:info@alphaomegaadvisors.co.za" className="text-slate-400 hover:text-gold-400">info@alphaomegaadvisors.co.za</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">South Africa</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">Mon – Fri: 08:00 – 17:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Alpha and Omega Advisors. All rights reserved.</p>
          <p>Professional Accountants and Tax Advisors</p>
        </div>
      </div>
    </footer>
  );
}
