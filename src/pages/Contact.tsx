import { useState } from 'react';
import { Phone, Mail, Globe, Clock, MapPin, Send, CheckCircle, Loader } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const WA_ICON = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SERVICES = ['Kitchen Counter Tops', 'Bar Tops', 'Reception Counters', 'Wall Cladding', 'Bathroom Vanities', 'Custom Project', 'Other'];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate send (no backend yet)
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', phone: '', email: '', service: '', message: '' });
  }

  const field = (label: string, name: keyof typeof form, type = 'text', ph = '') => (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={ph}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-stone-800 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 ${errors[name] ? 'border-red-400' : 'border-stone-200 hover:border-stone-300'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="page-enter pt-24">
      {/* Header */}
      <section className="relative py-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://i.imgur.com/7dTi44k.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-tag text-gold-400">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Contact Us</h1>
          <div className="gold-bar mx-auto" />
          <p className="text-stone-300 max-w-xl mx-auto mt-4">
            Ready to start your project? Get in touch for a free consultation and quote.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Phone size={22} />,
                label: 'Call Us',
                value: '083 352 2647',
                href: 'tel:+27833522647',
                color: 'blue',
              },
              {
                icon: <WA_ICON />,
                label: 'WhatsApp',
                value: '+27 78 300 7127',
                href: 'https://wa.me/27783007127?text=Hi%2C%20I%20would%20like%20a%20quote.',
                color: 'green',
              },
              {
                icon: <Mail size={22} />,
                label: 'Email Us',
                value: 'Info@granite-installations.co.za',
                href: 'mailto:Info@granite-installations.co.za',
                color: 'amber',
              },
              {
                icon: <Globe size={22} />,
                label: 'Website',
                value: 'www.granite-installations.co.za',
                href: 'https://www.granite-installations.co.za',
                color: 'stone',
              },
            ].map((card) => (
              <Reveal key={card.label}>
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center p-6 rounded-2xl border border-stone-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300 group bg-white hover:-translate-y-1 h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-500 flex items-center justify-center mb-3 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">{card.label}</p>
                  <p className="text-stone-700 font-medium text-sm break-all">{card.value}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Form */}
            <Reveal>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                <h2 className="section-heading mb-1">Request a Quote</h2>
                <p className="text-stone-500 text-sm mb-6">Fill in your details and we'll get back to you within 24 hours.</p>

                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="font-bold text-stone-800 text-xl mb-2">Message Sent!</h3>
                    <p className="text-stone-500 text-sm mb-6">Thank you! We'll be in touch within 24 hours.</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-gold"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {field('Full Name *', 'name', 'text', 'e.g. John Smith')}
                    {field('Phone Number *', 'phone', 'tel', 'e.g. 083 352 2647')}
                    {field('Email Address *', 'email', 'email', 'e.g. john@example.com')}

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Service Required *</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-stone-800 outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all ${errors.service ? 'border-red-400' : 'border-stone-200'}`}
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        placeholder="Tell us about your project…"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-stone-800 outline-none resize-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all ${errors.message ? 'border-red-400' : 'border-stone-200'}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold-500 hover:bg-gold-400 disabled:bg-gold-300 text-white font-semibold rounded-xl transition-colors text-sm"
                    >
                      {loading ? (
                        <><Loader size={16} className="animate-spin-slow" /> Sending…</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-stone-400 text-xs mb-2">Prefer to chat directly?</p>
                      <a
                        href="https://wa.me/27783007127?text=Hi%2C%20I%20would%20like%20a%20quote%20for%20stone%20installation."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <WA_ICON /> WhatsApp Us Instead
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Info */}
            <Reveal>
              <div className="space-y-6">
                {/* Business hours */}
                <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-500 flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <h3 className="font-bold text-stone-800">Business Hours</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[
                      ['Monday – Friday', '7:30am – 5:00pm'],
                      ['Saturday', '8:00am – 1:00pm'],
                      ['Sunday', 'Closed'],
                      ['Public Holidays', 'Closed'],
                    ].map(([day, time]) => (
                      <li key={day} className="flex items-center justify-between text-stone-600">
                        <span className="font-medium">{day}</span>
                        <span className={time === 'Closed' ? 'text-red-400' : 'text-green-600 font-medium'}>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address */}
                <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-500 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <h3 className="font-bold text-stone-800">Find Us</h3>
                  </div>
                  <p className="text-stone-500 text-sm mb-4">South Africa — servicing clients nationally.</p>
                  {/* Map embed */}
                  <div className="rounded-xl overflow-hidden border border-stone-100 h-48">
                    <iframe
                      title="Alpha and Omega Advisors Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.9!2d28.04!3d-26.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzAwLjAiUyAyOMKwMDInMjQuMCJF!5e0!3m2!1sen!2sza!4v1700000000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                {/* Quick contact */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+27833522647"
                    className="flex items-center justify-center gap-2 py-4 bg-navy-900 hover:bg-stone-800 text-white font-semibold rounded-2xl text-sm transition-colors"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href="https://wa.me/27783007127?text=Hi%2C%20I%20would%20like%20a%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-2xl text-sm transition-colors"
                  >
                    <WA_ICON /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
