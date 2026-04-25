import { useI18n } from '../contexts/I18nContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, isAr } = useI18n();

  return (
    <footer id="footer" className="bg-brand-dark text-slate-300 py-10 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-6 text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className="hover:text-brand-gold transition">{t('nav.home')}</Link>
          <span className="text-slate-600">|</span>
          <Link to="/cars" className="hover:text-brand-gold transition">{t('nav.fleet')}</Link>
          <span className="text-slate-600">|</span>
          <a href="#footer" className="hover:text-brand-gold transition">{t('nav.contact')}</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} El Menzel Car — {isAr ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}
        </div>
      </div>
    </footer>
  );
}

