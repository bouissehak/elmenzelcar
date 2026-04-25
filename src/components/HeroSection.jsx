import { useI18n } from '../contexts/I18nContext';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Shield, Clock, Star } from 'lucide-react';

export default function HeroSection() {
  const { isAr } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 md:right-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 md:left-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

      {/* Content - Perfectly Centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-brand-gold" />
            <span className="text-sm text-white/90 font-medium">
              {isAr ? '+1000 عميل راضٍ' : '+1000 clients satisfaits'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-slide-up">
            {isAr ? (
              <>
                تأجير <span className="text-gradient-gold">سيارات فاخرة</span>
                <br />
                بأسعار مذهلة
              </>
            ) : (
              <>
                Location de{' '}
                <span className="text-gradient-gold">voitures premium</span>
                <br />
                à prix imbattable
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed animate-fade-in">
            {isAr
              ? 'اكتشف تجربة قيادة استثنائية مع أسطولنا من المركبات الفاخرة. حجز سريع، أسعار شفافة، وخدمة عملاء على مدار الساعة.'
              : 'Découvrez une expérience de conduite exceptionnelle avec notre flotte de véhicules haut de gamme. Réservation rapide, tarifs transparents et service client 24/7.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Link
              to="/cars"
              className="group btn-premium inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-gold text-brand-dark font-bold text-lg shadow-lg hover:shadow-brand-gold/30"
            >
              {isAr ? 'استكشف المركبات' : 'Explorer les véhicules'}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
            <a
              href="tel:+212682469090"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition backdrop-blur-sm"
            >
              <Clock className="w-5 h-5" />
              {isAr ? 'اتصل بنا الآن' : 'Nous appeler'}
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-12 flex items-center justify-center gap-8 animate-fade-in">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-gold" />
              <span className="text-sm text-slate-300">{isAr ? 'تأمين شامل' : 'Assurance incluse'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-gold" />
              <span className="text-sm text-slate-300">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
