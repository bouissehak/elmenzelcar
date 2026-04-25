import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useI18n } from '../contexts/I18nContext';
import HeroSection from '../components/HeroSection';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import TestimonialsSection from '../components/TestimonialsSection';
import OffersSection from '../components/OffersSection';
import FAQSection from '../components/FAQSection';
import BrandsSection from '../components/BrandsSection';
import { Link } from 'react-router-dom';
import { Car, Loader2, Phone, Mail, MapPin, Shield, Clock, Sparkles, Wrench, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { t, isAr } = useI18n();
  const cars = useQuery(api.cars.getCars, { status: undefined });
  const [selectedCar, setSelectedCar] = useState(null);

  const features = [
    { icon: Clock, text: t('features.fastBooking') },
    { icon: Sparkles, text: t('features.competitivePrices') },
    { icon: Wrench, text: t('features.wellMaintained') },
    { icon: Shield, text: t('features.support24_7') },
  ];

  return (
    <div>
      {/* Hero Section with car image background */}
      <HeroSection />

      {/* Brands / Partners Section */}
      <BrandsSection />

      {/* Offers Section */}
      <OffersSection />

      {/* Fleet Section */}
      <section id="fleet" className="py-20 md:py-28 bg-slate-50 relative texture-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold tracking-wide uppercase mb-4">
              <Star className="w-4 h-4" />
              <span>{isAr ? 'الأسطول' : 'Notre Flotte'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
              {isAr ? 'اختر مركبتك المثالية' : 'Choisissez votre véhicule idéal'}
            </h2>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              {t('fleet.subtitle')}
            </p>
          </div>

          {cars === undefined ? (
            <div className="flex items-center justify-center py-20 text-brand-slate">
              <Loader2 className="w-10 h-10 animate-spin mr-3" />
              <span className="text-lg">{isAr ? 'جاري التحميل...' : 'Chargement...'}</span>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20">
              <Car className="w-20 h-20 mx-auto mb-4 text-slate-300" />
              <p className="text-lg text-brand-slate">
                {isAr ? 'لا توجد مركبات متاحة حالياً' : 'Aucun véhicule disponible pour le moment.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.slice(0, 3).map((car, index) => (
                  <div
                    key={car._id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CarCard car={car} onBook={setSelectedCar} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-14">
                <Link
                  to="/cars"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-brand-dark text-brand-dark font-bold text-lg hover:bg-brand-dark hover:text-white transition-all duration-300"
                >
                  {isAr ? 'عرض كل المركبات' : 'Voir tous les véhicules'}
                  <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold tracking-wide uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'لماذا نحن' : 'Pourquoi nous'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
              {isAr ? 'لماذا تختارنا؟' : 'Pourquoi nous choisir ?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-brand-gold/10 hover:border-brand-gold/20 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-gold/10 group-hover:bg-brand-gold flex items-center justify-center transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-brand-gold group-hover:text-brand-dark transition-colors duration-300" />
                </div>
                <p className="text-brand-dark font-bold text-lg">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact CTA Section */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span className="text-sm text-white/90 font-medium">
                {isAr ? 'نحن هنا لمساعدتك' : 'Nous sommes là pour vous aider'}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {isAr ? 'جاهزون لرحلتك؟' : 'Prêt pour votre voyage ?'}
            </h2>

            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              {isAr
                ? 'احجز مركبتك الفاخرة الآن واستمتع بتجربة قيادة لا تُنسى'
                : 'Réservez votre véhicule premium dès maintenant et profitez d\'une expérience de conduite inoubliable'}
            </p>

            <div className={`flex flex-wrap justify-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Link
                to="/cars"
                className="group btn-premium inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-gold text-brand-dark font-bold text-lg shadow-lg"
              >
                {isAr ? 'احجز الآن' : 'Réserver maintenant'}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
              <a
                href="https://wa.me/212682469090"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl glass text-center hover:bg-white/15 transition">
              <Phone className="w-6 h-6 text-brand-gold mx-auto mb-3" />
              <p className="text-white font-semibold">+212 682-469090</p>
            </div>
            <div className="p-6 rounded-2xl glass text-center hover:bg-white/15 transition">
              <Mail className="w-6 h-6 text-brand-gold mx-auto mb-3" />
              <p className="text-white font-semibold">contact@elmenzelcar.ma</p>
            </div>
            <div className="p-6 rounded-2xl glass text-center hover:bg-white/15 transition">
              <MapPin className="w-6 h-6 text-brand-gold mx-auto mb-3" />
              <p className="text-white font-semibold">Fès-Sefrou, Maroc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedCar && (
        <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}

