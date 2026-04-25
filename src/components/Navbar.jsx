import { useI18n } from '../contexts/I18nContext';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, Globe, Shield, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { t, toggleLang, isAr } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/cars', label: t('nav.fleet') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center shadow-lg shadow-brand-gold/30 group-hover:shadow-brand-gold/50 transition-shadow">
              <Car className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
                {isAr ? 'المنزل للسيارات' : 'El Menzel Car'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-semibold transition-colors duration-300 py-2 ${
                  isActive(link.to)
                    ? 'text-brand-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                )}
              </Link>
            ))}
            <a
              href="#footer"
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300"
            >
              {t('nav.contact')}
            </a>

            <div className="w-px h-6 bg-white/20" />

            <Link
              to="/admin"
              className="text-slate-400 hover:text-brand-gold transition-colors"
              title="Admin"
            >
              <Shield className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold text-white transition-all duration-300 border border-white/10"
            >
              <Globe className="w-4 h-4" />
              {isAr ? 'FR' : 'AR'}
            </button>

            <a
              href="tel:+212682469090"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-brand-dark font-bold text-sm hover:shadow-lg hover:shadow-brand-gold/30 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {isAr ? 'اتصل' : 'Appeler'}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-dark/98 backdrop-blur-xl border-t border-white/10 px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition ${
                isActive(link.to)
                  ? 'bg-brand-gold/10 text-brand-gold'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#footer"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white transition"
          >
            {t('nav.contact')}
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-brand-gold transition"
          >
            <Shield className="w-4 h-4" />
            {t('nav.admin')}
          </Link>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              <Globe className="w-4 h-4" />
              {isAr ? 'Passer au Français' : 'التبديل إلى العربية'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
